const fs = require('fs');
const data = require('../../data.json');
const { age, date } = require('../utils');
Intl = require('intl');


exports.show = function(req,res) {
  const { id } = req.params;
  const foundMember = data.members.find(function(member){
    return member.id == id
  });

  if(!foundMember){
    return res.send("INSTRUCTOR NOT FOUND");
  }
  
  

  const member = {
    ...foundMember,
    age: age(foundMember.birth),
    gender: foundMember.gender == 'M' ? 'Masculino': 'Feminino',


  }
  return res.render('members/show', {member});
}

exports.create = function(req,res){
  return res.render('members/create');
}
exports.post = function(req,res){
  const keys = Object.keys(req.body);

  for (const key of keys) {
    if (req.body[key] == ""){
      return res.send('Please, fill all fields');
    }
  }

  const {avatar_url, name, email, gender, blood,height, weight, } = req.body;
  const lastMember = data.members[data.members.length - 1];
  const id = lastMember ?  lastMember.id + 1 : 1;
  let { birth } = req.body;
  birth = Date.parse(birth);
  

  
  data.members.push({
    id,
    avatar_url,
    name,
    email,
    gender,
    birth,
    blood,
    height,
    weight
  });

  fs.writeFile("data.json",JSON.stringify(data, null, 2), function(err){
    if(err) return res.send('Write File Error');
    
    return res.redirect(`/members/${id}`)
  });
}

exports.edit = function(req,res){

  const { id } = req.params;
  const foundMember = data.members.find(function(member){
    return member.id == id
  });

  if(!foundMember){
    return res.send("INSTRUCTOR NOT FOUND");
  }

  foundMember.birth = date(foundMember.birth);
  return res.render('members/edit', {member: foundMember})
}

exports.put = function(req,res){
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function(member, foundIndex){
    if(member.id == id){
      index = foundIndex;
      return true
    }
  });

  if(!foundMember){
    return res.send("INSTRUCTOR NOT FOUND");
  }

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(foundMember.id)
  }

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
    if (err) return res.send("Write error!")

    return res.redirect(`/members/${id}`)
  });
}

exports.delete = function(req,res){
  const { id } = req.body;

  const filteredMember = data.members.filter(function(member){
    return member.id != id
  });
  
  data.members = filteredMember;
  fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
    if (err) return res.send("Write error!")

    return res.redirect(`/members`)
  });
}

exports.index =  function(req,res){
  const members = data.members;
  return res.render('members/index', { members });
}


