// Add Ingredient
const addIngredientByName = (db, req, res) => {
    let ingredient = {name: req.params.name}
    const sql = `INSERT INTO ingredients(name) VALUES('${ingredient}') ON CONFLICT DO NOTHING`
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
const addMultipleIngredients = async (db, req, res) => {
    let ingredients = req.body.ingredients
    let allIngredients = `('${ingredients[0]}')`
    ingredients.slice(1).forEach( ing =>
        allIngredients+=(`,('${ing}')`)
    )
    const sql = `INSERT INTO ingredients(name) VALUES${allIngredients} ON CONFLICT DO NOTHING`
    try{
        const result = await db.query(sql);
        res.send({
            message: `${result.rowCount} ingredients added successfully.`,
            result
        });
        console.log(result)
        return result.rowCount;
    } catch(err){
        res.send(err);
    }
};

// Remove recipe by name
const removeIngredientByName = (db, req, res) => {
    let sql = `DELETE FROM ingredients WHERE name = '${req.params.name}'`;
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

// Get ingredient by name
const getIngredientByName = (db, req, res) => {
    let sql = `SELECT * FROM ingredients WHERE name = '${req.params.name}'`;
    db.query(sql, (err, result) => {
        if(err) {
            res.send(err);
        }
        const ingredient = result.rows[0]
        console.log(result.rows[0]);
        res.send({
            message: `Ingredient '${req.params.name}' fetched successfully.`,
            ingredient
        });
    });
};

// Get multiple ingredients
const getMultipleIngredients = async (db, req, res) => {
    let ingredients = req.body.ingredients
    let allIngredients = `'${ingredients[0]}'`
    ingredients.slice(1).forEach( ing =>
        allIngredients+=(`,'${ing}'`)
    )
    let sql = `SELECT * FROM ingredients WHERE name in (${allIngredients})`;
    try{
        const result = await db.query(sql);
        res.send({
            message: `Ingredients (${allIngredients}) fetched successfully.`,
        });
        console.log(result.rows)
        return result.rows;
    } catch(err){
        res.send(err);
    }
};

module.exports = {
    addIngredientByName,
    removeIngredientByName,
    getIngredientByName,
    getAllIngredients,
    getMultipleIngredients,
    addMultipleIngredients
}