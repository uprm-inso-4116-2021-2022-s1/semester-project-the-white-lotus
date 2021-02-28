const Enumerable = require("linq");
const teaAPI = require("./tea.api");
const ingredientAPI = require("./ingredient.api");
const format = require('pg-format');
//#region Add Recipe
// Adds new Recipe to database
const addRecipe =  async (db, req, res) => {
    let data = {
        title: req.body.title,
        difficulty: req.body.difficulty,
        yield: req.body.yield,
        procedure: req.body.procedure,
        materials: req.body.materials,
        teaName: req.body.teaName
    };
    const tea = await (teaAPI.getTeaByName(db, data.teaName, res))
    const recipeQuery = {
        text: 'INSERT INTO recipes(title, difficulty, yield, procedure, teaID)  VALUES($1, $2, $3, $4, $5) RETURNING id',
        values: [data.title, data.difficulty, data.yield, data.procedure, tea.id],
    }
    // Insert recipe in db
    let recipeID;
    try{
        recipeID = await db.query(recipeQuery);
        recipeID = recipeID.rows[0].id;
    }catch(err){
        res.send(err);
    }
    let ingredients = await data.materials.map(m => m.ingredient).flat()
    // Adds new ingredients to the db
    await (ingredientAPI.addMultipleIngredients(db, ingredients, res))
    // Gets all ingredients from db
    let ingredientsFromDB = await (ingredientAPI.getMultipleIngredients(db, ingredients, res))
    let materials = []
    // Create new Material objects and push them in materials
    data.materials.forEach(m =>
        materials.push(
            [
                recipeID,
                Enumerable.from(ingredientsFromDB).where(ing => ing.name === m.ingredient).first().id,
                m.amount
            ]
        )
    );
    // For each ingredient, insert row in bridge.
    const bridgeQuery = format(`INSERT INTO recipeandingredientsbridge(recipeid, ingredientid, ing_amount)  VALUES %L`, materials);
    db.query(bridgeQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result, data);
        res.send({
            message: 'Recipe successfully added.',
            data
        });
    });
};
//#endregion

//region Remove Recipe
// Remove data by id
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
// Edit data by id
// TODO: Edit method
const editRecipe = (db, req, res) => {
    let data = req.body;
    let recipeTitle = data.title === undefined? null: `'${data.title}'`;
    let recipeYield = data.yield === undefined? null: `'${data.yield}'`;
    let recipeDifficulty = data.difficulty === undefined? null: `'${data.difficulty}'`;
    // TODO: ingredients
    //let recipeIngredients = data.ingredients === undefined? null: `'{${data.ingredients}}'`;
    //ingredients = coalesce(${recipeIngredients}, ingredients),
    let recipeProcedure = data.procedure === undefined? null: `'${data.procedure}'`;
    let recipeTeaID = data.teaID === undefined? null: `'${data.teaID}'`;
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
        const data = result.rows[0]
        console.log(data);
        res.send({
            message: `Recipe updated to "${data}.`,
            data
        });
    });
};
//#endregion

//#region Get data
// Get all recipes
const getAllRecipes = (db, req, res) => {
    let sql = 'SELECT * FROM recipes';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        const recipes = result.rows
        console.log(result);
        res.send({
            message: `All recipes fetched successfully.`,
            recipes
        });
    });
};

// Get data by id
const getRecipeByID = (db, req, res) => {
    let sql = `SELECT * FROM recipes WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        const data = result.rows[0]
        console.log(data);
        res.send({
            message: `Recipe with id ${req.params.id} fetched successfully.`,
            data
        });
    });
};
//#endregion



module.exports = {
    addRecipe,
    removeRecipeByID,
    editRecipe,
    getAllRecipes,
    getRecipeByID
}