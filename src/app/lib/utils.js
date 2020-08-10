module.exports ={
  age: function(timestamp){
    const milisecondsYear = Date.parse(1971,1,1);
    return parseInt((Date.now() - timestamp)/milisecondsYear,10)
  },

  date: function(timestamp){
    // return date to HTML format
    return {
      date: new Intl.DateTimeFormat("pt-BR").format(timestamp).slice(0,10),
      birthday: new Intl.DateTimeFormat("pt-BR").format(timestamp).slice(0,5)
    }
  },
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