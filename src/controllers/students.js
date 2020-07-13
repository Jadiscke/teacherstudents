const fs = require('fs');
const data = require('../../data.json');
const { age, date } = require('../utils');
Intl = require('intl');


exports.show = function(req,res) {
  const { id } = req.params;
  const foundStudent = data.students.find(function(student){
    return student.id == id
  });

  if(!foundStudent){
    return res.send("INSTRUCTOR NOT FOUND");
  }
  
  

  const student = {
    ...foundStudent,
    age: age(foundStudent.birth),
    grade: foundStudent.level,


  }
  return res.render('students/show', {student});
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

  const {avatar_url, name, email, weekHours, level } = req.body;
  const lastStudent = data.students[data.students.length - 1];
  const id = lastStudent ?  lastStudent.id + 1 : 1;
  let { birth } = req.body;
  birth = Date.parse(birth);
  

  
  data.students.push({
    id,
    avatar_url,
    name,
    email,
    level,
    birth,
    weekHours,
  });

  fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err){
    if(err) return res.send('Write File Error');
    
    return res.redirect(`/students/${id}`)
  });
}

exports.edit = function(req,res){

  const { id } = req.params;
  const foundStudent = data.students.find(function(student){
    return student.id == id
  });

  if(!foundStudent){
    return res.send("INSTRUCTOR NOT FOUND");
  }

  foundStudent.birth = date(foundStudent.birth);
  return res.render('students/edit', {student: foundStudent})
}

exports.put = function(req,res){
  const { id } = req.body;
  let index = 0;

  const foundStudent = data.students.find(function(student, foundIndex){
    if(student.id == id){
      index = foundIndex;
      return true
    }
  });

  if(!foundStudent){
    return res.send("INSTRUCTOR NOT FOUND");
  }

  const student = {
    ...foundStudent,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(foundStudent.id)
  }

  data.students[index] = student;

  fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
    if (err) return res.send("Write error!")

    return res.redirect(`/students/${id}`)
  });
}

exports.delete = function(req,res){
  const { id } = req.body;

  const filteredStudent = data.students.filter(function(student){
    return student.id != id
  });
  
  data.students = filteredStudent;
  fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
    if (err) return res.send("Write error!")

    return res.redirect(`/students`)
  });
}

exports.index =  function(req,res){
  const students = data.students;
  return res.render('students/index', { students });
}


