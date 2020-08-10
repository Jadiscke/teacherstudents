const db = require('../config/db');


module.exports = {
    index(callback){
        db.query(`
            SELECT teachers.*
            FROM teachers
            ORDER BY teachers.name ASC
            `, function(err,results){
                if (err) throw `Database Error!\n ${err}`;


                callback(results.rows);
                return
            })
    },
}