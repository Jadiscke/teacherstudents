const { Pool } = require('pg');

module.exports = new Pool ({
    user: 'jadiscke',
    password: '123',
    host: 'localhost',
    port: 5432,
    database: 'teacher-students'
});