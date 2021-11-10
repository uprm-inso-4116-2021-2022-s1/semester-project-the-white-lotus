const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

//APIs
const teaAPI = require('./API/tea.api');
const recipeAPI = require("./API/recipe.api");
const ingredientAPI = require("./API/ingredient.api");
const noteAPI = require("./API/notes.api");
const tasteAPI = require("./API/tastes.api");
const flavorBridgeAPI = require("./API/flavorBridge.api");
const materialBridgeAPI = require("./API/materialBridge.api");
const funFactAPI = require("./API/funfact.api");

// Create connection
const db = new Client({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASS,
    database: process.env.PGDB,
    port: process.env.PGPORT,
    ssl: false,
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

//#region Example API
// ******************************** EXAMPLE API ****************************************************

// Create table
// app.get('/createpoststable', (req, res) => {
//     let sql = 'CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))';
//     db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send(`Posts table created...`);
//     })
// });

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
// app.get('/createteastable', (req, res) => {
//     teaAPI.createTeaTable(db, req, res);
// });

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

app.get('/getteas', jsonParser, (req, res) => {
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
app.get('/getteabyfilter', jsonParser, (req, res) => {
    teaAPI.getTeaByFilter(db, req, res);
});
//12 requests
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
app.get('/getrecipes', jsonParser, (req, res) => {
    recipeAPI.getAllRecipes(db, req, res);
});
app.get('/getrecipebyid/:id', jsonParser, (req, res) => {
    recipeAPI.getRecipeByID(db, req, res);
});
app.get('/getfullrecipes', jsonParser, (req, res) => {
    recipeAPI.getFullRecipes(db, req, res);
});
app.get('/getfullrecipebyid/:id', jsonParser, (req, res) => {
    recipeAPI.getFullRecipeByID(db, req, res);
});
app.get('/getRecipeByFilter', jsonParser, (req, res) => {
    recipeAPI.getRecipeByFilter(db, req, res);
});
// 6 requests
//#endregion

//#region Ingredient
app.get('/getingredients', jsonParser, (req, res) => {
    ingredientAPI.getAllIngredients(db, req, res);
});
app.get('/getingredientbyname/:name', jsonParser, (req, res) => {
    ingredientAPI.getIngredientByName(db, req, res);
});
app.get('/getmultipleingredients', jsonParser, (req, res) => {
    ingredientAPI.getMultipleIngredients(db, req, res);
});
app.post('/addingredient/:name', jsonParser, (req, res) => {
    ingredientAPI.addIngredientByName(db, req, res);
});
app.post('/addmultipleingredients/', jsonParser, (req, res) => {
    ingredientAPI.addMultipleIngredients(db, req, res);
});
app.delete('/removeingredient/:name', jsonParser, (req, res) => {
    ingredientAPI.removeIngredientByName(db, req, res);
});
// 6 requests
//#endregion

//#region Notes API
app.get('/getnotes', jsonParser, (req, res) => {
    noteAPI.getAllNotes(db, req, res);
});
app.get('/getnotebyname/:name', jsonParser, (req, res) => {
    noteAPI.getNoteByName(db, req, res);
});
app.get('/getmultiplenotes', jsonParser, (req, res) => {
    noteAPI.getMultipleNotes(db, req, res);
});
app.post('/addnote/:name', jsonParser, (req, res) => {
    noteAPI.addNote(db, req, res);
});
app.post('/addmultiplenotes', jsonParser, (req, res) => {
    noteAPI.addMultipleNotes(db, req, res);
});
app.delete('/removenote/:name', jsonParser, (req, res) => {
    noteAPI.removeNoteByName(db, req, res);
});
// 6 requests
//#endregions

//#region Taste API
app.get('/gettastes', jsonParser, (req, res) => {
    tasteAPI.getAllTastes(db, req, res);
});
app.get('/gettastebyname/:name', jsonParser, (req, res) => {
    tasteAPI.getTasteByName(db, req, res);
});
app.post('/addtaste/:name', jsonParser, (req, res) => {
    tasteAPI.addTaste(db, req, res);
});
app.delete('/removetaste/:name', jsonParser, (req, res) => {
    tasteAPI.removeTasteByName(db, req, res);
});
// 4 requests
//#endregion

//#region FlavorBridge
app.get('/getflavorentities', jsonParser, (req, res) => {
    flavorBridgeAPI.getAllFlavorEntities(db, req, res);
});
app.get('/getflavorentitybyid/:id', jsonParser, (req, res) => {
    flavorBridgeAPI.getFlavorEntityByID(db, req, res);
});
app.post('/addflavorentity/:name', jsonParser, (req, res) => {
    flavorBridgeAPI.addFlavorEntity(db, req, res);
});
app.post('/addmultipleflavorentities/', jsonParser, (req, res) => {
    flavorBridgeAPI.addMultipleFlavorEntities(db, req, res);
});
app.delete('/removeflavorentitybyid/:id', jsonParser, (req, res) => {
    flavorBridgeAPI.removeFlavorEntityByID(db, req, res);
});
// 5 requests
//#endregion

//#region MaterialBridge
app.get('/getmaterialentities', jsonParser, (req, res) => {
    materialBridgeAPI.getAllMaterialEntities(db, req, res);
});
app.get('/getmaterialentitybyid/:id', jsonParser, (req, res) => {
    materialBridgeAPI.getMaterialEntityByID(db, req, res);
});
app.post('/addmaterialentity/:name', jsonParser, (req, res) => {
    materialBridgeAPI.addMaterialEntity(db, req, res);
});
app.post('/addmultiplematerialentities/', jsonParser, (req, res) => {
    materialBridgeAPI.addMultipleMaterialEntities(db, req, res);
});
app.delete('/removematerialentitybyid/:id', jsonParser, (req, res) => {
    materialBridgeAPI.removeMaterialEntityByID(db, req, res);
});
//5 requests
//#endregion

//#region FunFact API
app.get('/getfunfacts', jsonParser, (req, res) => {
    funFactAPI.getAllFunFacts(db, req, res);
});
app.get('/getfunfactbyid/:id', jsonParser, (req, res) => {
    funFactAPI.getFunFactByID(db, req, res);
});
app.get('/getrandomfact', jsonParser, (req, res) => {
    funFactAPI.getRandomFact(db, req, res);
});
app.post('/addfunfact', jsonParser, (req, res) => {
    funFactAPI.addFunFact(db, req, res);
});
app.delete('/removefunfact/:id', jsonParser, (req, res) => {
    funFactAPI.removeFunFactByID(db, req, res);
});

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
app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    console.log(`\nhttp://localhost:${PORT}`);
});