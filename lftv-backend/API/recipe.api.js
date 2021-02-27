
const teaAPI = require("./tea.api");
const ingredientAPI = require("./ingredient.api");
//#region Add Recipe
// Add new Recipe to database
// TODO
const addRecipe =  async (db, req, res) => {
    let recipe = {
        title: req.body.title,
        difficulty: req.body.difficulty,
        yield: req.body.yield,
        procedure: req.body.procedure,
        ingredients: req.body.ingredients,
        teaName: req.body.teaName
    };
    const tea = (teaAPI.getTeaByName(db, recipe.teaName, res))
    await (ingredientAPI.addMultipleIngredients(db, recipe.ingredients, res))
    const ingredients = await (ingredientAPI.ge)
    // Check if ingredients exist. If they don't, add them to the db. Save their ids in an array.
    const sql = {
        text: 'INSERT INTO recipes(title, difficulty, yield, procedure,  teaID)  VALUES($1, $2, $3, $4, $5)',
        values: [recipe.title, recipe.difficulty, recipe.yield, recipe.procedure, tea.id],
    }
    // Add recipe to bridge.
    // Add recipe to recipes.
    db.query(sql, (err, result) => {
        if (err) {
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
        const recipe = result.rows[0]
        console.log(recipe);
        res.send({
            message: `Recipe updated to "${recipe}.`,
            recipe
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
        const recipes = result.rows
        console.log(result);
        res.send({
            message: `All recipes fetched successfully.`,
            recipes
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
        const recipe = result.rows[0]
        console.log(recipe);
        res.send({
            message: `Recipe with id ${req.params.id} fetched successfully.`,
            recipe
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