const Enumerable = require("linq");
const teaAPI = require("./tea.api");
const ingredientAPI = require("./ingredient.api");
const materialBridgeAPI = require("./materialBridge.api");
const tastesAPI = require("./tastes.api");
const notesAPI = require("./notes.api");
const flavorBridgeAPI = require("./flavorBridge.api");
//#region Add Recipe
// Add new Recipe to database
const addRecipe =  async (db, req, res) => {
    let data = {
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
        const tea = await (teaAPI.getTeaByName(db, data.teaName, res, true));
        const recipeQuery = {
            text: 'INSERT INTO recipes(title, difficulty, yield, procedure, teaID)  VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [data.title, data.difficulty, data.yield, data.procedure, tea.id],
        }
        // Insert recipe in db
        let recipeID = await db.query(recipeQuery);
        recipeID = recipeID.rows[0].id;
        let ingredients = await data.materials.map(m => m.ingredient).flat()
        // Add new ingredients to the db
        await (ingredientAPI.addMultipleIngredients(db, ingredients, res, true))
        // Gets all ingredients from db
        let ingredientsFromDB = await (ingredientAPI.getMultipleIngredients(db, ingredients, res, true))
        let materials = []
        data.materials.forEach(m =>
            materials.push(
                [
                    recipeID,
                    Enumerable.from(ingredientsFromDB).where(ing => ing.name === m.ingredient).first().id,
                    m.amount
                ]
            )
        );
        // Insert material entities
        await (materialBridgeAPI.addMultipleMaterialEntities(db, materials, res, true));
        const taste = await (tastesAPI.getTasteByName(db, data.taste, res,true ));
        const notes = await (notesAPI.getMultipleNotes(db, data.notes, res,true ));
        let flavors = []
        notes.forEach(n =>
            flavors.push(
                [
                    taste.id,
                    n.id,
                    recipeID,
                ]
            )
        )
        await (flavorBridgeAPI.addMultipleFlavorEntities(db, flavors, res, true ))
        res.end(
            `\nRecipe "${data.title}" added successfully.`, 'utf8', () => {
                console.log(`Added new recipe`);
            }
        );
    }
    catch(err){
        res.send(err);
    }
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
    let sql = `UPDATE recipes 
               SET title = coalesce(${recipeTitle}, title),
                yield = coalesce(${recipeYield}, yield),
                difficulty = coalesce(${recipeDifficulty}, difficulty),
                procedure = coalesce(${recipeProcedure}, procedure),
                teaid = coalesce(${tea.id}, teaid),
               WHERE id = ${req.params.id}`;
    // try{
    //     await db.query(sql);
    // }catch(err){
    //     res.send(err);
    // }
    // if (data.materials !== undefined) {
    //     let ingredients = await data.materials.map(m => m.ingredient).flat()
    //     // Add new ingredients to the db
    //     await (ingredientAPI.addMultipleIngredients(db, ingredients, res))
    //     // Get all ingredients from db
    //     let ingredientsFromDB = await (ingredientAPI.getMultipleIngredients(db, ingredients, res))
    //     let materials = []
    //     data.materials.forEach(m =>
    //         materials.push(
    //             [
    //                 req.params.id,
    //                 Enumerable.from(ingredientsFromDB).where(ing => ing.name === m.ingredient).first().id,
    //                 m.amount
    //             ]
    //         )
    //     );
    //     // Delete all existing rows for this recipe
    //     const deleteQuery = format(`DELETE FROM recipeandingredientsbridge where recipeid = $(req.params.id)`);
    //     try {
    //         await db.query(deleteQuery);
    //     } catch (err) {
    //         res.send(err);
    //     }
    //     // For each ingredient, insert row in bridge.
    //     const bridgeQuery = format(`INSERT INTO recipeandingredientsbridge(recipeid, ingredientid, ing_amount)  VALUES %L`, materials);
    //     try {
    //         await db.query(bridgeQuery);
    //     } catch (err) {
    //         res.send(err);
    //     }
    // }
    // res.send({
    //     message: `Recipe updated.`,
    // });
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
                `All recipes fetched successfully.`, 'utf8', () => {
                console.log(`Fetched '${recipes.rows.length}' recipes`);
            })
        }
        else{
            res.send({
                message: `All recipes fetched successfully.`,
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
// Get Full Recipes
const getFullRecipes = async (db, req, res, nestedRes = false) => {
    let allRecipes = await getAllRecipes(db, req, res, true)
    try{
        let fullRecipes = await Promise.all(allRecipes.map(async recipe => {return await getFullRecipeByID(db, recipe.id, res, true)}));
        if (nestedRes) {
            res.write(
                `${fullRecipes.length} recipes fetched successfully.`, 'utf8', () => {
                    console.log(`${fullRecipes.rowCount} recipes fetched successfully.`);
                })
        } else {
            let len = fullRecipes.length
            fullRecipes = JSON.stringify(fullRecipes, null, 4)
            res.end(`\n ${len} recipes fetched successfully : ${fullRecipes}`);
        }
        return fullRecipes;
    }
    catch(err){
        res.end(err)
    }
}
// Get Full Recipe By ID
const getFullRecipeByID = async (db, req, res, nestedRes = false) => {
    try {
        let recipeID = nestedRes ? req : req.params.id;
        let recipe = await getRecipeByID(db, recipeID, res, true);
        let tea = await teaAPI.getTeaByID(db, recipe.teaid, res, true);
        let flavors = await flavorBridgeAPI.getFlavorEntityByRecipeID(db, recipeID, res, true);
        let taste = await tastesAPI.getTasteByID(db, flavors[0].tasteid, res, true);
        let allNotes = await notesAPI.getAllNotes(db, req, res, true);
        let allIngredients = await ingredientAPI.getAllIngredients(db, req, res, true);
        let allMaterials = await materialBridgeAPI.getMaterialEntityByRecipeID(db, recipeID, res, true);
        let mappedNotes = []
        Enumerable.from(flavors).forEach(flavor =>
            mappedNotes.push(Enumerable.from(allNotes).where(note => note.id === flavor.noteid).select(note => note.name).first())
        )
        let mappedMaterials = [];
        Enumerable.from(allMaterials).forEach(material =>
            mappedMaterials.push({
                ingredient: Enumerable.from(allIngredients).where(ing => ing.id === material.ingredientid).select(ing => ing.name).first(),
                amount: material.ing_amount,
            })
        )
        let fullRecipe = {
            id: recipeID,
            title: recipe.title,
            difficulty: recipe.difficulty,
            yield: recipe.yield,
            procedure: recipe.procedure,
            tea: tea[0].name,
            materials: mappedMaterials,
            taste: taste[0].name,
            notes: mappedNotes
        }
        if (nestedRes) {
            res.write(
                `Recipe '${fullRecipe.title}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched recipe with id = '${recipeID}' ingredients`);
                })
        } else {
            fullRecipe = JSON.stringify(fullRecipe, null, 4)
            res.end(`Full recipe with id = '${recipeID}' fetched successfully: \n\n ${fullRecipe}`);
        }
        return fullRecipe;
    } catch(err){
        res.end(err);
    }
}
//#endregion



module.exports = {
    addRecipe,
    removeRecipeByID,
    editRecipe,
    getAllRecipes,
    getRecipeByID,
    getFullRecipeByID,
    getFullRecipes
}