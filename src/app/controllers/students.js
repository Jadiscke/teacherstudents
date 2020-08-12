const { age, date, grade } = require('../lib/utils');
const Student = require('../models/Student');
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

    return res.render('students/show', { student });
  })


  

  
}

exports.create = function(req,res){
  return res.render('students/create');
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
      console.log(id);
    });
}

exports.edit = function(req,res){

  const { id } = req.params;
  Student.findById(id, (student) => {
    student = {
      ...student,
      birth_date: date(student.birth_date).iso 
    }
    return res.render('students/edit', { student });
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

  Student.index((students) => {
    for (const student of students){
      student.subjects = String(student.subjects).split(",")
    }
    return res.render('students/index', { students });

  });
}

