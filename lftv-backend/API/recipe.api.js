const Enumerable = require("linq");
const teaAPI = require("./tea.api");
const ingredientAPI = require("./ingredient.api");
const materialBridgeAPI = require("./materialBridge.api");
//#region Add Recipe
// Add new Recipe to database
const addRecipe =  async (db, req, res) => {
    let data = {
        title: req.body.title,
        difficulty: req.body.difficulty,
        yield: req.body.yield,
        procedure: req.body.procedure,
        materials: req.body.materials,
        teaName: req.body.teaName
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
        res.end(
            `Recipe "${data.title}" added successfully.`, 'utf8', () => {
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

//#region Edit Recipe
// Edit data by id
// TODO: Finish
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
// TODO: Fix
const getAllRecipes = async (db, req, res) => {
    let sql = 'SELECT * FROM recipes';
    try {
        const recipes = await db.query(sql);
        res.send({
            message: `All recipes fetched successfully.`,
            recipes
        });
        // res.write(
        //     `All recipes fetched successfully.`, 'utf8', () => {
        //     console.log(`Fetched '${recipes.rows.length}' recipes`);
        // })
        return recipes.rows;
    } catch (err) {
        res.send(err);
    }
    // const recipes = db.query(sql, (err, result) => {
    //     if(err) {
    //         console.log(err);
    //         res.send(`Error, check console log.`);
    //     }
    //     // const recipes = result.rows
    //     return result.rows;
    //     // res.send({
    //     //     message: `All recipes fetched successfully.`,
    //     //     recipes
    //     // });
    // });
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
// TODO: TEST
const getFullRecipes = async (db, req, res) => {
    let allRecipes = await getAllRecipes(db, req, res)
    let allTeas = await teaAPI.getAllTeas(db, req, res)
    let materialBridgeEntities = await materialBridgeAPI.getAllMaterialBridgeEntities(db, req, res)
    let fullRecipes = []
    allRecipes.forEach(recipe =>
        fullRecipes.push(
            [
                recipe.id,
                recipe.title,
                recipe.difficulty,
                recipe.yield,
                recipe.procedure,
                Enumerable.from(allTeas).where(t => t.id === recipe.teaid).select(t => [t.id, t.name]).first(),
                Enumerable.from(materialBridgeEntities).where(m => m.recipeid === recipe.id).select(m => [m.ingredientid, m.amount])
            ]
        )
    )
    fullRecipes.forEach(r =>
        r[7].forEach(m =>
            m[0] = allIngredients.first(i => i.id === m[0])
        )
    )
    return fullRecipes;
}
// TODO: TEST
const getFullRecipeByID = (db, req, res) => {
    let recipeID = req.params.id
    let recipe = allRecipes.first(r => r.id == recipeID)
    let materials = materialBridge.where(mb => mb.recipeid == recipeID).select(mb => {mb.ingredient, mb.amount})
    let tea = allTeas.first(t => t.id == recipe.teaid)
    let fullRecipe =  [
        recipe.id,
        recipe.title,
        recipe.difficulty,
        recipe.yield,
        recipe.procedure,
        tea,
        materials
    ]
    fullRecipe[7].forEach(m =>
            m[0] = allIngredients.first(i => i.id === m[0])
    )
}
//#endregion



module.exports = {
    addRecipe,
    removeRecipeByID,
    editRecipe,
    getAllRecipes,
    getRecipeByID,
    getFullRecipes
}