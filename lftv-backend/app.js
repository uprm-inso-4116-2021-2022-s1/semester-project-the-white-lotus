const express = require('express');
const mysql = require ('mysql');
const bodyParser = require('body-parser');

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'lftv',
    insecureAuth : true
});

// Connect to database
db.connect((err) => {
   if (err)
       throw err;
    console.log('MySql Connected...');
});

const app = express();
// required for requests to have json body
const jsonParser = bodyParser.json();
//required for requests to have x-www-form-urlencoded body
const urlencodedParser = bodyParser.urlencoded({ extended : false});

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


//#region Example API
// ******************************** EXAMPLE API ****************************************************

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
app.get('/addpost', (req, res) => {
    let post = {title: 'Post One', body: 'This is a random post'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Posts added...`);
    });
});

// Insert post with body
app.get('/addpostbody', jsonParser, (req, res) => {
    let post = {title: req.body.title, body: req.body.body};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send({
            message: 'Post added...',
            post
        });
    });
    // console.log(req);
    // res.send('Done')
});

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM posts';
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send({
            message: 'Posts feteched...',
            results
        });
    });
});

// Select individual post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Post fetched...`);
    })
});

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title'; // hardcorded change, another can be receiving JSON and using req.body.{whatevs}
    let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Post updated...`);
    });
});

// Remove single post
app.get('/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(`Post deleted...`);
    })
});

// ******************************** EXAMPLE API ****************************************************
//#endregion



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`\nhttp://localhost:${PORT}`);
});