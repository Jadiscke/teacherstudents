module.exports ={
  age: function(timestamp){
    const milisecondsYear = Date.parse(1971,1,1);
    return parseInt((Date.now() - timestamp)/milisecondsYear,10)
  },

  date: function(timestamp){
    // return date to HTML format
    return new Date(timestamp).toISOString().slice(0,10);
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
  }

}