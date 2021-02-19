const express = require('express');
const mysql = require ('mysql');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'lftv',
    insecureAuth : true
});

// Connect
db.connect((err) => {
   if (err)
       throw err;
    console.log('MySql Connected...');
});

const app = express();

// Create DB
// to create the db, uncomment the following lines and remove from above "database: 'lftv'," temporarily
// run the server, go to that location, DB is created. comment the lines, put back what you removed from above.
// app.get('/createdb', (req, res) => {
//     let sql = 'CREATE DATABASE lftv';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send('database created...');
//     })
// });



// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Posts table created...`);
    })
});

// Insert post
app.get('/addpost1', (req, res) => {
    let post = {title: 'Post One', body: 'This is a random post'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Posts added...`);
    });
});

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(`Posts fetched...\n` + results.toString());
    })
});

// Select individual post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Post fetched...\n` + result.toString());
    })
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`\nhttp://localhost:${PORT}`);
});