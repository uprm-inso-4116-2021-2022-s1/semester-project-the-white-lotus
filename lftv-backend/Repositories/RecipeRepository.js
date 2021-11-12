// Add new Recipe to database
const Enumerable = require("linq");
const {GetTeaByName} = require("./TeaRepository");
const format = require("pg-format");

async function AddRecipe (recipe, db){
    let tea = await GetTeaByName(recipe.teaName, db);
    tea = tea.rows;
    const recipeQuery = {
        text: 'INSERT INTO recipes(title, difficulty, yield, procedure, teaID)  VALUES($1, $2, $3, $4, $5) RETURNING id',
        values: [recipe.title, recipe.difficulty, recipe.yield, recipe.procedure, tea.id],
    }
    // Insert recipe in db and store id
    let recipeID = await db.query(recipeQuery);
    recipeID = recipeID.rows[0].id;
    let ingredients = await recipe.materials.map(m => m.ingredient).flat()
    // Add new ingredients to the db
    await AddIngredients(ingredients, db);
    // Get all ingredients from db
    let ingredientsFromDB = await GetMultipleIngredients(ingredients, db);
    ingredientsFromDB = ingredientsFromDB.rows;
    // Map ingredients and amounts
    let materials = []
    recipe.materials.forEach(m =>
        materials.push(
            [
                recipeID,
                Enumerable.from(ingredientsFromDB).where(ing => ing.name === m.ingredient).first().id,
                m.amount
            ]
        )
    );
    // Add entities to material bridge
    await AddMaterialEntities(materials, db);
    // Get taste by name
    const taste = await GetTasteByName (recipe.taste, db);
    // Get notes by name
    let notes = await GetNotesByName(recipe.notes, db);
    notes = notes.rows;
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
    // Add entities to flavor bridge
    await AddFlavorEntities(flavors, db);
}

// Add multiple ingredients
async function AddIngredients (ingredients, db){
    let allIngredients = `('${ingredients[0]}')`
    ingredients.slice(1).forEach( ing =>
        allIngredients+=(`,('${ing}')`)
    )
    const sql = `INSERT INTO ingredients(name) VALUES${allIngredients} ON CONFLICT DO NOTHING`
    const result = await db.query(sql);
    return result;
}

// Add material entities
async function AddMaterialEntities (materials, db){
    const sql = format(`INSERT INTO MaterialsBridge(recipeid, ingredientid, ing_amount)  VALUES %L ON CONFLICT DO NOTHING`, materials);
    const result = await db.query(sql);
    return result;
}

// Add flavor entities
async function AddFlavorEntities (flavorEntities, db){
    let allFlavorEntities = `('${flavorEntities[0]}')`
    flavorEntities.slice(1).forEach( ing =>
        allFlavorEntities+=(`,('${ing}')`)
    )
    const sql = format(`INSERT INTO FlavorBridge(tasteid, noteid, recipeid)  VALUES %L ON CONFLICT DO NOTHING`, flavorEntities);
    const result = await db.query(sql);
    return result;
}

// Remove data by id
async function RemoveRecipeByID (id, db){
    let sql = `DELETE FROM recipes WHERE id = ${req.params.id}`;
    const result = await db.query(sql);
    return result;
}

// Get all recipes
async function GetAllRecipes(db){
    let sql = 'SELECT * FROM recipes';
    const recipes = await db.query(sql);
    return recipes;
}

// Get recipe by id
async function GetRecipeByID (id, db){
    let sql = `SELECT * FROM recipes WHERE id = ${id}`;
    const result = await db.query(sql);
    return result;
}

// Get multiple ingredients
async function GetMultipleIngredients (ingredients, db){
    let allIngredients = `'${ingredients[0]}'`
    ingredients.slice(1).forEach(ing =>
        allIngredients+=(`,'${ing}'`)
    )
    let sql = `SELECT * FROM ingredients WHERE name in (${allIngredients})`;
    const result = await db.query(sql);
    return result;
}

//Get taste by name
async function GetTasteByName (name, db){
    let sql = `SELECT * FROM tastes WHERE name = '${name}'`;
    const taste = await db.query(sql);
    return taste;
}

//Get notes by name
async function GetNotesByName (notes, db){
    let allNotes = `'${notes[0]}'`
    notes.slice(1).forEach( ing =>
        allNotes+=(`,'${ing}'`)
    )
    let sql = `SELECT * FROM notes WHERE name in (${allNotes})`;
    const result = await db.query(sql);
    return result;
}


module.exports = {
    AddRecipe,
    AddIngredients,
    AddMaterialEntities,
    AddFlavorEntities,
    RemoveRecipeByID,
    GetAllRecipes,
    GetRecipeByID,
    GetMultipleIngredients,
    GetNotesByName,
    GetTasteByName
}
