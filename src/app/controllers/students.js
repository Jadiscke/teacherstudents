const { age, date, grade } = require('../lib/utils');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
Intl = require('intl');




exports.show = function(req,res) {
  const { id } = req.params;
  Student.findById(id,(student) => {
    student = {
      ...student,
      birth_date: date(student.birth_date).birthDay,
      age: age(student.birth_date),
      subjects: String(student.subjects).split(','),
      education_level: grade(student.education_level)
    }

    Teacher.findById(student.teacher_id,(teacher)=> {
      return res.render('students/show', { student, teacher });
    })

    
  })


  

  
}

exports.create = function(req,res){
  Teacher.index((teachers)=> {
    return res.render('students/create', { teachers });
  });
  
}

exports.post = function(req,res){
  const keys = Object.keys(req.body);

  for (const key of keys) {
    if (req.body[key] == ""){
      return res.send('Please, fill all fields');
    }
  }

    Student.create(req.body,( { id  })=> {
      res.redirect('/students')
    });
}

exports.edit = function(req,res){

  const { id } = req.params;
  Student.findById(id, (student) => {
    student = {
      ...student,
      birth_date: date(student.birth_date).iso 
    }
    Teacher.index((teachers)=>{
      return res.render('students/edit', { student, teachers });
    })
    
  })
  
}

exports.put = function(req,res){
  const { id } = req.body;
  Student.update(req.body,()=> {
    res.redirect(`/students/${id}`)
  });
}

exports.delete = function(req,res){
  const { id } = req.body;

  Student.delete(id, () => {
    return res.redirect('/students');
  });
}

exports.index =  function(req,res){

  const { filter, page = 1, limit = 2 } = req.query;

  const offset = limit * (page - 1);

  const options = {
    page,
    limit,
    offset,
    filter,
    callback: (students) => {
      const pagination = {
        total: students[0]? Math.ceil(students[0].total / limit) : 0,
        page
      }

      for (const student of students){
        student.subjects = String(student.subjects).split(",")
      }

      return res.render('students/index', { students, filter, pagination });

    }
  }

  Student.paginate(options);
}

