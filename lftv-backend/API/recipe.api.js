const teaAPI = require('./API/tea.api');

// Create Recipe table
// This is NOT to be used, just to show how it'd work
const createRecipeTable = (db, req, res) => {
    let sql = 'CREATE TABLE recipes(Id SERIAL PRIMARY KEY, Title VARCHAR(255), Difficulty VARCHAR(255), Yield VARCHAR(1024), Ingredients TEXT[], Procedure TEXT)';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send(`Recipes table created successfully.`);
    });
};

//#region Add Recipe
// Add new Recipe to database
// TODO
const addRecipe = (db, req, res) => {
    let recipe = {
        title: req.body.title,
        difficulty: req.body.difficulty,
        yield: req.body.yield,
        procedure: req.body.procedure,
        ingredients: req.body.ingredients,
        teaName: req.body.teaName
    };
    // Get teaID
    var teaID = -1;
    try{
        const tea = teaAPI.getTeaByName(recipe.teaName)
        teaID = tea.id
    }
    catch(err){
        console.log(err);
        res.send(`Tea not found. First, you must add the tea in the database.`);
    }
    // Check if ingredients exist. If they don't, add them to the db. Save their ids in an array.
    const sql = {
        text: 'INSERT INTO recipes(title, difficulty, yield, teaID, procedure)  VALUES($1, $2, $3, $4, $5)',
        values: [recipe.title, recipe.difficulty, recipe.yield, teaID,  recipe.procedure],
    }
    // Add recipe to bridge.
    // Add recipe to recipes.
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result, recipe);
        res.send({
            message: 'Recipe successfully added.',
            recipe
        });
    });
};
//#endregion

//region Remove Recipe
// Remove recipe by id
const removeRecipeByID = (db, req, res) => {
    let sql = `DELETE FROM recipes WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Recipe removed.`,
            result
        });
    });
};
//#endregion

//#region Edit Recipe
// ALL EDITS ARE DONE BY ID
// Edit recipe by id
// TODO: Edit method
const editRecipe = (db, req, res) => {
    let recipe = req.body;
    let recipeTitle = recipe.title === undefined? null: `'${recipe.title}'`;
    let recipeYield = recipe.yield === undefined? null: `'${recipe.yield}'`;
    let recipeDifficulty = recipe.difficulty === undefined? null: `'${recipe.difficulty}'`;
    // TODO: ingredients
    //let recipeIngredients = recipe.ingredients === undefined? null: `'{${recipe.ingredients}}'`;
    //ingredients = coalesce(${recipeIngredients}, ingredients),
    let recipeProcedure = recipe.procedure === undefined? null: `'${recipe.procedure}'`;
    let recipeTeaID = recipe.teaID === undefined? null: `'${recipe.teaID}'`;
    let sql = `UPDATE recipes 
               SET title = coalesce(${recipeTitle}, title),
               yield = coalesce(${recipeYield}, yield),
               difficulty = coalesce(${recipeDifficulty}, difficulty),
               procedure = coalesce(${recipeProcedure}, procedure),
               teaid = coalesce(${recipeTeaID}, teaid),
               WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Recipe updated to "${recipe}.`,
            result
        });
    });
};
//#endregion

//#region Get recipe
// Get all recipes
const getAllRecipes = (db, req, res) => {
    let sql = 'SELECT * FROM recipes';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `All recipes fetched successfully.`,
            result
        });
    });
};

// Get recipe by id
const getRecipeByID = (db, req, res) => {
    let sql = `SELECT * FROM recipes WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Recipe with id ${req.params.id} fetched successfully.`,
            result
        });
    });
};
//#endregion



module.exports = {
    createRecipeTable,
    addRecipe,
    removeRecipeByID,
    editRecipe,
    getAllRecipes,
    getRecipeByID
}