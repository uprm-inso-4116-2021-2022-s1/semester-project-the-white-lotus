const Enumerable = require("linq");
const teaAPI = require("./tea.api");
const ingredientAPI = require("./ingredient.api");
const materialBridgeAPI = require("./materialBridge.api");
const tastesAPI = require("./tastes.api");
const notesAPI = require("./notes.api");
const flavorBridgeAPI = require("./flavorBridge.api");
const {AddRecipe, GetRecipeByFilter, GetFullRecipeByID, GetFullRecipes, GetRecipeByID, GetAllRecipes, RemoveRecipeByID, EditRecipe} = require("../Repositories/RecipeRepository");
const {Recipe} = require("../DTOs/Recipe");
const {RecipeFilter} = require("../DTOs/RecipeFilter");
const {Material} = require("../DTOs/Material");
//#region Add Recipe
// Add new Recipe to database
const addRecipe =  async (db, req, res) => {
    let materials = await req.body.materials
        .map(m => new Material(m.ingredient, m.amount))
        .flat();
    let recipe = new Recipe(
        req.body.title,
        req.body.difficulty,
        req.body.yield,
        req.body.procedure,
        materials,
        req.body.teaName,
        req.body.taste,
        req.body.notes
    );
    try{
        await AddRecipe(recipe, db)
        res.send({
            message: `Recipe "${recipe.title}" added successfully.`
        });
    }
    catch(err){
        res.send(err.message);
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
    const newRecipe = new Recipe(
        req.params.id,
        req.params.title,
        req.params.yield,
        req.params.difficulty,
        req.params.procedure,
        req.params.teaName,
        req.params.materials,
        req.params.notes,
        req.params.taste
    )
    try{
        const result = await EditRecipe(newRecipe, db);
        res.send({
            message: `Recipe ${newRecipe.id} was updated.`,
            result
        });
    }catch(err){
        res.send(err.message)
    }
}

//#endregion

//#region Get data
// Get all recipes
const getAllRecipes = async (db, req, res, nestedRes = false) => {
    try {
        const recipes = await GetAllRecipes(db);
        res.send({
            message: `All ${recipes.length} recipes fetched successfully.`,
            recipes
        });
        return recipes.rows;
    } catch (err) {
        res.send(err.message);
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
        res.send(err.message)
    }
};

// Get all recipes
const getFullRecipes = async (db, req, res, nestedRes = false) => {
    try {
        const result = await GetFullRecipes(db);
        res.send({
            message: `${result.length} full recipes fetched successfully.`,
            result
        })
    } catch (err) {
        res.send(err.message);
    }
}

// Get full recipe by id
const getFullRecipeByID = async (db, req, res, nestedRes = false) => {
    let id = req.params.id;
    try {
        const result = await GetFullRecipeByID(id, db);
        res.send({
            message: `Full 
            recipe with id ${id} fetched successfully.`,
            result
        })
    } catch (err) {
        res.send(err.message);
    }
}

// Get recipe using difficulty, teatype, taste, notes, or/and ingredients.
const getRecipeByFilter = async (db, req, res, nestedRes = false) => {
    try {
        const filter = new RecipeFilter(
            req.body.difficulty,
            req.body.teatype,
            req.body.taste,
            req.body.notes,
            req.body.ingredients
        );
        const result = await GetRecipeByFilter(filter, db);
        res.send({
            message: `[${result.length}] recipes matched the request.`,
            result
        })
    } catch (err) {
        res.send(err.message);
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
