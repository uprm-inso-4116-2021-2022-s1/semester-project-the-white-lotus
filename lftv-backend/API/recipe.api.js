const Enumerable = require("linq");
const teaAPI = require("./tea.api");
const ingredientAPI = require("./ingredient.api");
const materialBridgeAPI = require("./materialBridge.api");
const tastesAPI = require("./tastes.api");
const notesAPI = require("./notes.api");
const flavorBridgeAPI = require("./flavorBridge.api");
const {AddRecipe, GetRecipeByFilter} = require("../Repositories/RecipeRepository");
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

// TODO: FIX
//#region Edit Recipe
// Edit data by id
const editRecipe = async (db, req, res) => {
    let data = req.body;
    let recipeTitle = data.title === undefined? null: `'${data.title}'`;
    let recipeYield = data.yield === undefined? null: `'${data.yield}'`;
    let recipeDifficulty = data.difficulty === undefined? null: `'${data.difficulty}'`;
    let recipeProcedure = data.procedure === undefined? null: `'${data.procedure}'`;
    let tea = await (teaAPI.getTeaByName(db, data.tea, res))
    // Bridges
    let recipeMaterials = data.materials === undefined? null: data.materials;
    let recipeNotes= data.notes === undefined? null: data.notes;
    let recipeTaste = data.taste === undefined? null: `'${data.taste}'`;
    let recipeQuery = `UPDATE recipes 
               SET title = coalesce(${recipeTitle}, title),
                yield = coalesce(${recipeYield}, yield),
                difficulty = coalesce(${recipeDifficulty}, difficulty),
                procedure = coalesce(${recipeProcedure}, procedure),
                teaid = coalesce(${tea.id}, teaid),
               WHERE id = ${req.params.id}`;
    try {
        const recipeResult = await db.query(recipeQuery);
    } catch(err){

    }
    // Overwrite ingredients
    if (recipeMaterials !== null){
        const materialsQuery = ``;
        try{
            await db.query(materialsQuery);
        } catch(err){

        }
    }
    // Overwrite taste
    if (recipeTaste !== null){
        const tasteQuery = `UPDATE flavorbridge
                SET tasteid = coalesce (${recipeTaste}, tasteid)
                WHERE recipeid = ${req.params.id}`;
        try{
            await db.query(tasteQuery);
        } catch(err){

        }
    }
    // Overwrite notes
    if (recipeNotes !== null){
        const notesQuery = ``;
        try{
            await db.query(notesQuery);
        } catch(err){

        }
    }
}

//#endregion

//#region Get data
// Get all recipes
const getAllRecipes = async (db, req, res, nestedRes = false) => {
    let sql = 'SELECT * FROM recipes';
    try {
        const recipes = await db.query(sql);
        if (nestedRes){
            res.write(
                `All ${recipes.rowCount} recipes fetched successfully.`, 'utf8', () => {
                console.log(`Fetched '${recipes.rows.length}' recipes`);
            })
        }
        else{
            res.send({
                message: `All ${recipes.rowCount} recipes fetched successfully.`,
                recipes
            });
        }
        return recipes.rows;
    } catch (err) {
        res.send(err);
    }
};
// Get data by id
const getRecipeByID = async (db, req, res, nestedRes = false) => {
    let id = nestedRes? req : req.params.id
    let sql = `SELECT * FROM recipes WHERE id = ${id}`;
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `Recipe '${result.rows[0].title}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${result.rows[0].title}' recipe`);
                })
        }
        else{
            res.send({
                message: `Recipe '${result.rows[0].title}' fetched successfully.`,
                result
            })
        }
        return result.rows[0]

    }catch(err){
        res.send(err)
    }
};
const getFullRecipes = async (db, req, res, nestedRes = false) => {
    let sql = `select recipes.id,
                    recipes.title, 
                    recipes.difficulty,
                    recipes.yield,
                    recipes.procedure,
                    teas.name as TeaName, 
                    teas.type as TeaType, 
                    tastes.name as Taste, 
                    array_agg(distinct notes.name) as Note,
                    array_agg(distinct array[ingredients.name, mb.ing_amount]) as Ingredients 
                from recipes
                left join teas on recipes.teaid = teas.id
                left join flavorbridge as fb on recipes.id = fb.recipeid
                left join tastes on fb.tasteid = tastes.id
                left join notes on fb.noteid = notes.id
                left join materialsbridge as mb on recipes.id = mb.recipeid
                left join ingredients on ingredients.id = mb.ingredientid
                group by (recipes.id,        
                        recipes.title, 
                        recipes.difficulty,
                        recipes.yield,
                        recipes.procedure,
                        teaname, 
                        teatype, 
                        taste);`
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `${result.rowCount} full recipes fetched successfully.`, 'utf8', () => {
                    console.log(`'${result.rowCount}' full recipes fetched successfully.`);
                })
            return result.rows;
        }
        else{
            res.send({
                message: `${result.rowCount} full recipes fetched successfully.`,
                result
            })
        }
    } catch (err) {
        res.send(err);
    }
}
const getFullRecipeByID = async (db, req, res, nestedRes = false) => {
    let id = nestedRes ? req : req.params.id;
    let sql = `select recipes.id,
                    recipes.title, 
                    recipes.difficulty,
                    recipes.yield,
                    recipes.procedure,
                    teas.name as TeaName, 
                    teas.type as TeaType, 
                    tastes.name as Taste, 
                    array_agg(distinct notes.name) as Note,
                    array_agg(distinct array[ingredients.name, mb.ing_amount]) as Ingredients 
                from recipes
                left join teas on recipes.teaid = teas.id
                left join flavorbridge as fb on recipes.id = fb.recipeid
                left join tastes on fb.tasteid = tastes.id
                left join notes on fb.noteid = notes.id
                left join materialsbridge as mb on recipes.id = mb.recipeid
                left join ingredients on ingredients.id = mb.ingredientid
                group by (recipes.id,        
                        recipes.title, 
                        recipes.difficulty,
                        recipes.yield,
                        recipes.procedure,
                        teaname, 
                        teatype, 
                        taste)
                having recipes.id = ${id};`;
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `Full recipe with id ${id} fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched taste with id '${id}'.`);
                })
            return result.rows;
        }
        else{
            res.send({
                message: `Full recipe with id ${id} fetched successfully.`,
                result
            })
        }
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
