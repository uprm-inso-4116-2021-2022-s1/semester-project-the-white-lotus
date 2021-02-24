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
// Create Recipe
const addRecipe = (db, req, res) => {
    let recipe = {
        title: req.body.title,
        difficulty: req.body.difficulty,
        yield: req.body.yield,
        teaLeaf: req.body.teaLeaf,
        ingredients: req.body.ingredients,
        procedure: req.body.procedure
    };
    const sql = {
        text: 'INSERT INTO recipes(title, difficulty, yield, ingredients, procedure, tea_leaf)  VALUES($1, $2, $3, $4, $5, $6)',
        values: [recipe.title, recipe.difficulty, recipe.yield, recipe.teaLeaf, recipe.ingredients, recipe.procedure, recipe.teaLeaf],
    }
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
const editRecipe = (db, req, res) => {
    let recipe = req.body;
    let recipeTitle = recipe.title === undefined? null: `'${recipe.title}'`;
    let recipeYield = recipe.yield === undefined? null: `'${recipe.yield}'`;
    let recipeDifficulty = recipe.difficulty === undefined? null: `'${recipe.difficulty}'`;
    let recipeIngredients = recipe.ingredients === undefined? null: `'{${recipe.ingredients}}'`;
    let recipeProcedure = recipe.procedure === undefined? null: `'${recipe.procedure}'`;
    let recipeTeaLeaf = recipe.teaLeaf === undefined? null: `'${recipe.teaLeaf}'`;
    let sql = `UPDATE recipes 
               SET title = coalesce(${recipeTitle}, title),
               yield = coalesce(${recipeYield}, yield),
               difficulty = coalesce(${recipeDifficulty}, difficulty),
               ingredients = coalesce(${recipeIngredients}, ingredients),
               procedure = coalesce(${recipeProcedure}, procedure),
               tea_leaf = coalesce(${recipeTeaLeaf}, tea_leaf),
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
const editTitle = (db, req, res) => {
    let newTitle = req.body.title;
    let sql = `UPDATE recipes SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Title updated to "${newTitle}.`,
            result
        });
    });
};
// Edit difficulty by id
const editDifficulty = (db, req, res) => {
    let newDifficulty = req.body.difficulty;
    let sql = `UPDATE recipes SET difficulty = '${newDifficulty}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Difficulty updated to "${newDifficulty}.`,
            result
        });
    });
};
// Edit Yield by id
const editYield = (db, req, res) => {
    let newYield = req.body.yield;
    let sql = `UPDATE recipes SET yield = '${newYield}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Yield updated to "${newYield}.`,
            result
        });
    });
};
// Edit Ingredients by id
const editIngredients = (db, req, res) => {
    let newIngredients = req.body.ingredients;
    let sql = `UPDATE recipes SET ingredients = '{${newIngredients}}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Ingredients updated to "${newIngredients}.`,
            result
        });
    });
};
// Edit Procedure by id
const editProcedure = async (db, req, res) => {
    let newProcedure = req.body.procedure;
    let sql = `UPDATE recipes SET procedure = '${newProcedure}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Procedure updated to "${newProcedure}.`,
            result
        });
    });
};
// Edit Tea Leaf by id
const editTeaLeaf = async (db, req, res) => {
    let newTeaLeaf = req.body.teaLeaf;
    let sql = `UPDATE recipes SET tea_leaf = '${newTeaLeaf}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Tea Leaf updated to "${newTeaLeaf}.`,
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
// Filter
const filterRecipe = (db, req, res) => {
    let sql = `SELECT * 
               FROM recipes 
               WHERE difficulty = ${req.params.difficulty},
                AND tea_leaf = ${req.params.teaLeaf},
                AND ingredients in ${req.params.ingredients}`;
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
    editTitle,
    editDifficulty,
    editYield,
    editIngredients,
    editProcedure,
    editTeaLeaf,
    getAllRecipes,
    getRecipeByID
}