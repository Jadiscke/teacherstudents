const fs = require('fs');
const data = require('../../data.json');
const { age, date } = require('../utils');
Intl = require('intl');



exports.show = function(req,res) {
  const { id } = req.params;
  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  });

  if(!foundInstructor){
    return res.send("INSTRUCTOR NOT FOUND");
  }
  
  

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    gender: foundInstructor.gender == 'M' ? 'Masculino': 'Feminino',
    services: String(foundInstructor.services).split(','),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),

  }
  return res.render('instructors/show', {instructor});
}

exports.create = function(req,res){
  return res.render('instructors/create');
}

exports.post = function(req,res){
  const keys = Object.keys(req.body);

  for (const key of keys) {
    if (req.body[key] == ""){
      return res.send('Please, fill all fields');
    }
  }

  const {avatar_url, name, services, gender } = req.body;
  const created_at = Date.now();
  const lastInstructor = data.instructors[data.instructors.length - 1];
  const id = lastInstructor ?  lastInstructor.id + 1 : 1;
  let { birth } = req.body;
  birth = Date.parse(birth);
  

  
  data.instructors.push({
    id,
    avatar_url,
    name,
    gender,
    birth,
    services,
    created_at,
  });

  fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err){
    if(err) return res.send('Write File Error');
    
    return res.redirect(`/instructors/${id}`)
  });
}

exports.edit = function(req,res){

  const { id } = req.params;
  const foundInstructor = data.instructors.find(function(instructor){
    return instructor.id == id
  });

  if(!foundInstructor){
    return res.send("INSTRUCTOR NOT FOUND");
  }

  foundInstructor.birth = date(foundInstructor.birth);
  return res.render('instructors/edit', {instructor: foundInstructor})
}

exports.put = function(req,res){
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find(function(instructor, foundIndex){
    if(instructor.id == id){
      index = foundIndex;
      return true
    }
  });

  if(!foundInstructor){
    return res.send("INSTRUCTOR NOT FOUND");
  }

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(foundInstructor.id)
  }

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
    if (err) return res.send("Write error!")

    return res.redirect(`/instructors/${id}`)
  });
}

exports.delete = function(req,res){
  const { id } = req.body;

  const filteredInstructor = data.instructors.filter(function(instructor){
    return instructor.id != id
  });
  
  data.instructors = filteredInstructor;
  fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
    if (err) return res.send("Write error!")

    return res.redirect(`/instructors`)
  });
}

exports.index =  function(req,res){
  const instructors = data.instructors;
  for (const instructor of instructors){
    instructor.services = String(instructor.services).split(",")
  }
  return res.render('instructors/index', { instructors });
}

