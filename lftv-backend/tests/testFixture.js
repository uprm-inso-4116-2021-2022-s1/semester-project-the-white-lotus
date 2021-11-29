'use strict';
const chai = require('chai');
const { Client } = require('pg');
require('dotenv').config();
chai.use(require('chai-as-promised'));

describe('Access to DB', function(){
    describe('#fail', function(){
        it('Connection was unsuccessful.', function(done){
            const db = new Client({
                host: process.env.PGHOST,
                user: process.env.PGUSER,
                password: process.env.PGPASS,
                database: process.env.PGDB,
                port: process.env.PGPORT,
                ssl: false,
            });
            db.connect(done);
            db.end(done);
        });
    })
});
before(function () {
    db.connect((err) => {
        if (err)
            throw err;
        console.log('Remote PostgresDB connected...');
    });
});
after(async function () {
    await db.end((err) => {
        if (err)
            throw err;
        console.log('Remote PostgresDB disconnected.')
    })
});
const db = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASS,
    database: process.env.PGDB,
    port: process.env.PGPORT,
    ssl: false,
});

module.exports = {db}