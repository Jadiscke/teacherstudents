const { age, date, graduation } = require('../lib/utils');
const Teacher = require('../models/Teacher');
Intl = require('intl');




exports.show = function(req,res) {
  const { id } = req.params;
  Teacher.findById(id,(teacher) => {
    teacher = {
      ...teacher,
      age: age(teacher.birth_date),
      class_type: teacher.class_type == 'local' ? 'Presencial': 'À Distância',
      subjects_taught: String(teacher.subjects_taught).split(','),
      education_level: graduation(teacher.education_level),
      created_at: date(teacher.created_at).format,
  
    }

    return res.render('teachers/show', { teacher });
  })


  

  
}

exports.create = function(req,res){
  return res.render('teachers/create');
}

exports.post = function(req,res){
  const keys = Object.keys(req.body);

  for (const key of keys) {
    if (req.body[key] == ""){
      return res.send('Please, fill all fields');
    }
  }

    Teacher.create(req.body,( { id  })=> {
      res.redirect('/teachers')
    });
}

exports.edit = function(req,res){

  const { id } = req.params;
  Teacher.findById(id, (teacher) => {
    teacher = {
      ...teacher,
      birth_date: date(teacher.birth_date).iso 
    }
    return res.render('teachers/edit', { teacher });
  })
  
}

exports.put = function(req,res){
  const { id } = req.body;
  Teacher.update(req.body,()=> {
    res.redirect(`/teachers/${id}`)
  });
}

exports.delete = function(req,res){
  const { id } = req.body;

  Teacher.delete(id, () => {
    return res.redirect('/teachers');
  });
}

exports.index = function(req,res){

  const { filter, page = 1, limit = 2 } = req.query;
  const offset = limit * (page - 1);

  const options = {
    page,
    limit,
    offset,
    filter,
    callback: (teachers) => {
      const pagination = {
        total: teachers[0]? Math.ceil(teachers[0].total / limit) : 0,
        page
      }

      for (const teacher of teachers){
        teacher.subjects_taught = String(teacher.subjects_taught).split(",")
      }

      return res.render('teachers/index', { teachers, filter, pagination });

    }
  }

  Teacher.paginate(options)

}

