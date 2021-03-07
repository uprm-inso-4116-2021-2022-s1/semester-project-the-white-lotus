const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

//APIs
const teaAPI = require('./API/tea.api');
const recipeAPI = require("./API/recipe.api");

// Create connection
const db = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASS,
    database: process.env.PGDB,
    port: process.env.PGPORT,
    ssl: true,
});

// Connect to database
db.connect((err) => {
   if (err)
       throw err;
    console.log('Remote PostgresDB connected...');
});

const app = express();
app.use(cors());
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
app.get('/getpost/:id', jsonParser, (req, res) => {
    let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send({
            message: `Post fetched...`,
            result
        });
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

//#region Tea API
app.get('/createteastable', (req, res) => {
    teaAPI.creatTeaTable(db, req, res);
});

app.get('/addtea', jsonParser, (req, res) => {
    teaAPI.addTea(db, req, res);
});

app.get('/removeteabyid/:id', jsonParser, (req, res) => {
    teaAPI.removeTeaByID(db, req, res);
});

app.get('/removeteabyname/:name', jsonParser, (req, res) => {
    teaAPI.removeTeaByName(db, req, res);
});

app.get('/edittypebyid/:id', jsonParser, (req, res) => {
    teaAPI.editTypeByID(db, req, res);
});

app.get('/edittypebyname/:name', jsonParser, (req, res) => {
    teaAPI.editTypeByName(db, req, res);
});

app.get('/editname/:id', jsonParser, (req, res) => {
    teaAPI.editName(db, req, res);
});

app.get('/editdescbyid/:id', jsonParser, (req, res) => {
    teaAPI.editDescByID(db, req, res);
});

app.get('/editdescbyname/:name', jsonParser, (req, res) => {
    teaAPI.editDescByName(db, req, res);
});

app.get('/gettea', jsonParser, (req, res) => {
    teaAPI.getAllTeas(db, req, res);
});

app.get('/getteabytype/:type', jsonParser, (req, res) => {
    teaAPI.getTeasByType(db, req, res);
});

app.get('/getteabyid/:id', jsonParser, (req, res) => {
    teaAPI.getTeaByID(db, req, res);
});

app.get('/getteabyname/:name', jsonParser, (req, res) => {
    teaAPI.getTeaByName(db, req, res);
});
//#endregion

//#region Recipe API
app.post('/addrecipe', jsonParser, (req, res) => {
    recipeAPI.addRecipe(db, req, res);
});

app.delete('/removerecipebyid/:id', jsonParser, (req, res) => {
    recipeAPI.removeRecipeByID(db, req, res);
});

app.patch('/editrecipe/:id', jsonParser, (req, res) => {
    recipeAPI.editRecipe(db, req, res);
});
app.patch('/edittitle/:id', jsonParser, (req, res) => {
    recipeAPI.editTitle(db, req, res);
});

app.patch('/editdifficulty/:id', jsonParser, (req, res) => {
    recipeAPI.editDifficulty(db, req, res);
});
app.patch('/edityield/:id', jsonParser, (req, res) => {
    recipeAPI.editYield(db, req, res);
});
app.patch('/editingredients/:id', jsonParser, (req, res) => {
    recipeAPI.editIngredients(db, req, res);
});
app.patch('/editprocedure/:id', jsonParser, (req, res) => {
    recipeAPI.editProcedure(db, req, res);
});
app.patch('/edittealeaf/:id', jsonParser, (req, res) => {
    recipeAPI.editTeaLeaf(db, req, res);
});
app.get('/getrecipes', jsonParser, (req, res) => {
    recipeAPI.getAllRecipes(db, req, res);
});

app.get('/getrecipebyid/:id', jsonParser, (req, res) => {
    recipeAPI.getRecipeByID(db, req, res);
});

//#endregion

//#region ... API
//#endregion

//#region ... API
//#endregion

app.get('/', jsonParser, (req, res) => {
    const response = {
        message: "Welcome to LFTV Backend",
        APIS: {
            teaAPI: {
                createTable: "/createteastable",
                addTea: "/addtea",
                removeTeaByID: "/removeteabyid/:id",
                removeTeaByName: "/removeteabyname/:name",
                editTypeByID: "/edittypebyid/:id",
                editTypeByName: "/edittypebyname/:name",
                editName: "/editname/:id",
                editDescByID: "/editdescbyid/:id",
                editDescByName: "/editdescbyname/:name",
                getAllTeas: "/gettea",
                getTeasByType: "/getteabytype/:type",
                getTeaByID: "/getteabyid/:id",
                getTeaByName: "/getteabyname/:name"
            }
        }
    }
    res.send(response);
});

const PORT = process.env.PGPORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`\nhttp://localhost:${PORT}`);
});