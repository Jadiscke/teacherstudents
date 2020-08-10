function date(timestamp) {
  const date = new Date(timestamp);

  const year = date.getUTCFullYear();
  const month = `0${date.getUTCMonth() + 1}`.slice(-2);
  const day = `0${date.getUTCDate()}`.slice(-2);

  return {
    day,
    month,
    year,
    iso: `${year}-${month}-${day}`,
    birthDay: `${day}/${month}`,
    format: `${day}/${month}/${year}`
  }
}

function age(timestamp){
  const milisecondsYear = Date.parse(1971,1,1);
  return parseInt((Date.now() - timestamp)/milisecondsYear,10)
}


module.exports ={
  age,
  date,
  graduation: function(level){
    const levelMap = {
      'highschool': 'Ensino Médio Completo',
      'undergraduation': 'Ensino Superior Incompleto',
      'undegraduated': 'Ensino Superior Completo',
      'master': 'Metrado',
      'doctor': 'Doutorado', 
    }
    return levelMap[`${level}`]
  },
  grade: function(level){
    const levelMap = {
      '1EF': '1° Ano do Ensino Fudamental',
      '2EF': '2° Ano do Ensino Fudamental',
      '3EF': '3° Ano do Ensino Fudamental',
      '4EF': '4° Ano do Ensino Fudamental',
      '5EF': '5° Ano do Ensino Fudamental', 
    }
    return levelMap[`${level}`]
  }

}