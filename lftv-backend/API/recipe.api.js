const Enumerable = require("linq");
const teaAPI = require("./tea.api");
const ingredientAPI = require("./ingredient.api");
const materialBridgeAPI = require("./materialBridge.api");
const tastesAPI = require("./tastes.api");
const notesAPI = require("./notes.api");
const flavorBridgeAPI = require("./flavorBridge.api");
const {AddRecipe, GetRecipeByFilter, GetFullRecipeByID, GetFullRecipes, GetRecipeByID, GetAllRecipes, RemoveRecipeByID, EditRecipe} = require("../Repositories/RecipeRepository");
//#region Add Recipe
// Add new Recipe to database
const addRecipe =  async (db, req, res) => {
    let recipe = {
        title: req.body.title,
        difficulty: req.body.difficulty,
        yield: req.body.yield,
        procedure: req.body.procedure,
        materials: req.body.materials,
        teaName: req.body.teaName,
        taste: req.body.taste,
        notes: req.body.notes,
    };
    try{
        await AddRecipe(recipe, db)
        res.send({
            message: `Recipe "${recipe.title}" added successfully.`
        });
    }
    catch(err){
        res.send(err);
    }
};

//region Remove Recipe
// Remove data by id
const removeRecipeByID = async (db, req, res) => {
    const id = req.params.id;
    try{
        const result = await RemoveRecipeByID(id, db);
        res.send({
            message: `Recipe removed.`,
            result
        });
    }catch(err){
        res.send(`Error, check console log.`);
        console.log(result);
    }
};
//#endregion

//#region Edit Recipe
// Edit data by id
const editRecipe = async (db, req, res) => {
    const newRecipe = {
        id: req.params.id,
        title: req.params.title,
        yield: req.params.yield,
        difficulty: req.params.difficulty,
        procedure: req.params.procedure,
        teaName: req.params.teaName,
        materials: req.params.materials,
        notes: req.params.notes,
        taste: req.params.taste,
    }
    try{
        const result = await EditRecipe(newRecipe, db);
        res.send({
            message: `Recipe ${newRecipe.id} was updated.`,
            result
        });
    }catch(err){
        res.send(err)
    }
}

//#endregion

//#region Get data
// Get all recipes
const getAllRecipes = async (db, req, res, nestedRes = false) => {
    try {
        const recipes = await GetAllRecipes(db);
        res.send({
            message: `All ${recipes.rowCount} recipes fetched successfully.`,
            recipes
        });
        return recipes.rows;
    } catch (err) {
        res.send(err);
    }
};

// Get data by id
const getRecipeByID = async (db, req, res, nestedRes = false) => {
    let id =  req.params.id;
    try{
        const result = await GetRecipeByID(id, db);
        res.send({
            message: `Recipe '${result.rows[0].title}' fetched successfully.`,
            result
        })
        return result.rows[0]

    }catch(err){
        res.send(err)
    }
};

// Get all recipes
const getFullRecipes = async (db, req, res, nestedRes = false) => {
    try {
        const result = await GetFullRecipes(db);
        res.send({
            message: `${result.rowCount} full recipes fetched successfully.`,
            result
        })
    } catch (err) {
        res.send(err);
    }
}

// Get full recipe by id
const getFullRecipeByID = async (db, req, res, nestedRes = false) => {
    let id = req.params.id;
    try {
        const result = await GetFullRecipeByID(id, db);
        res.send({
            message: `Full recipe with id ${id} fetched successfully.`,
            result
        })
    } catch (err) {
        res.send(err);
    }
}

// Get recipe using difficulty, teatype, taste, notes, or/and ingredients.
const getRecipeByFilter = async (db, req, res, nestedRes = false) => {
    try {
        const filter = {
            difficulty: req.body.difficulty,
            teatype: req.body.teatype,
            taste: req.body.taste,
            notes: req.body.notes,
            ingredients: req.body.ingredients,
        }
        const result = await GetRecipeByFilter(filter, db);
        res.send({
            message: `[${result.length}] recipes matched the request.`,
            result
        })
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    addRecipe,
    removeRecipeByID,
    editRecipe,
    getAllRecipes,
    getRecipeByID,
    getFullRecipeByID,
    getFullRecipes,
    getRecipeByFilter
}
