const db = require('../config/db');
const { date } = require('../lib/utils');


module.exports = {
    index(callback){
        db.query(`
            SELECT students.*
            FROM students
            ORDER BY students.name ASC
            `, function(err,results){
                if (err) throw `Database Error!\n ${err}`;


                callback(results.rows);
                return
            })
    },
    create(data,callback){
        const query = `
            INSERT INTO students(
                avatar_url,
                name,
                email,
                education_level,
                birth_date,
                week_hours,
                subjects,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.education_level,
            date(data.birth_date).iso,
            data.week_hours,
            data.subjects,
            data.teacher_id
        ]

        db.query(query,values, function(err,results){
            if(err) throw `Database Error!\n ${err}`;

            callback(results.rows[0]);
            return
        });
    },
    findById(id,callback){
        db.query(`
            SELECT students.*
            FROM students
            WHERE students.id = ${id}
            `, function(err,results){
                if (err) throw `Database Error!\n ${err}`;


                callback(results.rows[0]);
                return
            })
    },
    update(data,callback){

        const query = `
        UPDATE students SET 
            avatar_url=($1),
            name=($2),
            email=($3),
            education_level=($4),
            birth_date=($5),
            week_hours=($6),
            subjects=($7),
            teacher_id=($8)
        WHERE id = $9;
        `

        const values = [
            data.avatar_url,
            data.name,
            data.email,
            data.education_level,
            date(data.birth_date).iso,
            data.week_hours,
            data.subjects,
            data.teacher_id,
            data.id
        ]

        db.query(query,values, function(err,results) {
            if(err) throw `Database Erro! ${err}`;

            callback();
            return
        });



    },
    delete(id, callback){
        db.query(`
            DELETE FROM students
            WHERE students.id = ${id}
            `, function(err){
                if (err) throw `Database Error!\n ${err}`;


                callback();
                return
            })
    }
}