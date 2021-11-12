const teaAPI = require("./tea.api");
const ingredientAPI = require("./ingredient.api");
const Enumerable = require("linq");
const materialBridgeAPI = require("./materialBridge.api");
const tastesAPI = require("./tastes.api");
const notesAPI = require("./notes.api");
const flavorBridgeAPI = require("./flavorBridge.api");

async function addRecipe (recipe){
    const tea = await (teaAPI.getTeaByName(db, recipe.teaName, res, true));
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
}
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
