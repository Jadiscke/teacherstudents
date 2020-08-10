const db = require('../config/db');
const { date } = require('../lib/utils');


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
    create(data,callback){
        const query = `
            INSERT INTO teachers(
                avatar_url,
                name,
                birth_date,
                education_level,
                class_type,
                subjects_taught,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            date(Date.now()).iso,
        ]

        db.query(query,values, function(err,results){
            if(err) throw `Database Error!\n ${err}`;

            callback(results.rows[0]);
            return
        });
    },
    findById(id,callback){
        db.query(`
            SELECT teachers.*
            FROM teachers
            WHERE teachers.id = ${id}
            `, function(err,results){
                if (err) throw `Database Error!\n ${err}`;


                callback(results.rows[0]);
                return
            })
    }
}