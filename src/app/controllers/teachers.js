const fs = require('fs');
const data = require('../../../data.json');
const { age, date, graduation } = require('../lib/utils');
const Teacher = require('../models/Teacher');
Intl = require('intl');




exports.show = function(req,res) {
  const { id } = req.params;
  const foundTeacher = data.teachers.find(function(teacher){
    return teacher.id == id
  });

  if(!foundTeacher){
    return res.send("INSTRUCTOR NOT FOUND");
  }
  

  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    classType: foundTeacher.classType == 'local' ? 'Presencial': 'À Distância',
    services: String(foundTeacher.services).split(','),
    level: graduation(foundTeacher.level),
    created_at: date(foundTeacher.created_at).date,

  }

  return res.render('teachers/show', {teacher});
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
      console.log(id);
    });
}

exports.edit = function(req,res){

  const { id } = req.params;
  const foundTeacher = data.teachers.find(function(teacher){
    return teacher.id == id
  });

  if(!foundTeacher){
    return res.send("INSTRUCTOR NOT FOUND");
  }

  foundTeacher.birth = date(foundTeacher.birth);
  return res.render('teachers/edit', {teacher: foundTeacher})
}

exports.put = function(req,res){
  const { id } = req.body;
  let index = 0;

  const foundTeacher = data.teachers.find(function(teacher, foundIndex){
    if(teacher.id == id){
      index = foundIndex;
      return true
    }
  });

  if(!foundTeacher){
    return res.send("INSTRUCTOR NOT FOUND");
  }

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(foundTeacher.id)
  }

  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
    if (err) return res.send("Write error!")

    return res.redirect(`/teachers/${id}`)
  });
}

exports.delete = function(req,res){
  const { id } = req.body;

  const filteredTeacher = data.teachers.filter(function(teacher){
    return teacher.id != id
  });
  
  data.teachers = filteredTeacher;
  fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
    if (err) return res.send("Write error!")

    return res.redirect(`/teachers`)
  });
}

exports.index =  function(req,res){

  Teacher.index((teachers) => {
    for (const teacher of teachers){
      teacher.subjects_taught = String(teacher.subjects_taught).split(",")
    }
    return res.render('teachers/index', { teachers });

  });
}

