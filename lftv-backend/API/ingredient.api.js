//#region Add Ingredient
// Add Ingredient
const addIngredient = (db, req, res) => {
    let ingredient = {name: req.body.name}
    const sql = {
        text: 'INSERT INTO ingredients(name)  VALUES($1)',
        values: [ingredient.name],
    }
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result, ingredient);
        res.send({
            message: 'Ingredient successfully added.',
            ingredient
        });
    });
};
//#endregion
//region Remove Recipe
// Remove recipe by id
const removeIngredientByID = (db, req, res) => {
    let sql = `DELETE FROM ingredients WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Ingredient removed.`,
            result
        });
    });
};
//#endregion
//#region Get ingredients
// Get all ingredients
const getAllIngredients = (db, req, res) => {
    let sql = 'SELECT * FROM ingredients';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `All ingredients fetched successfully.`,
            result
        });
    });
};

// Get ingredient by id
const getIngredientByID = (db, req, res) => {
    let sql = `SELECT * FROM ingredients WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Ingredient with id ${req.params.id} fetched successfully.`,
            result
        });
    });
};

//#endregion
module.exports = {
    addIngredient,
    removeIngredientByID,
    getIngredientByID,
    getAllIngredients
}