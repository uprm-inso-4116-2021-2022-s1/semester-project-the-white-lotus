// Add Ingredient
const addIngredientByName = async (db, req, res, nestedRes = false) => {
    let ingredient = req.params.name
    const sql = `INSERT INTO ingredients(name) VALUES('${ingredient}') ON CONFLICT DO NOTHING`
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `$'{ingredient}' added successfully.`, 'utf8', () => {
                    console.log(`Added '${ingredient}'.`);
                }
            )
        }
        else{
            res.send({
                message: `${ingredient} ingredient added successfully.`,
                result
            });
        }
        console.log(result)
        return result.rowCount;
    } catch(err){
        res.send(err);
    }
};

// Add multiple ingredients
const addMultipleIngredients = async (db, req, res, nestedRes = false) => {
    let ingredients = nestedRes? req : req.body.ingredients
    let allIngredients = `('${ingredients[0]}')`
    ingredients.slice(1).forEach( ing =>
        allIngredients+=(`,('${ing}')`)
    )
    const sql = `INSERT INTO ingredients(name) VALUES${allIngredients} ON CONFLICT DO NOTHING`
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `\n${result.rowCount} ingredients added successfully.`, 'utf8', () => {
                    console.log(`Added '${result.rowCount}' ingredients`);
                }
            )
        }
        else{
            res.send({
                message: `${result.rowCount} ingredients added successfully.`,
                result
            });
        }
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
const getAllIngredients = async (db, req, res, nestedRes = false) => {
    let sql = 'SELECT * FROM ingredients';
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `All ${result.rowCount} ingredients fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${result.rows.length}' ingredients`);
                })
        }
        else{
            res.send({
                message: `All ${result.rowCount} ingredients fetched successfully.`,
                result
            })
        }
        return result.rows;
    } catch (err) {
        res.send(err);
    }
};

// Get ingredient by name
const getIngredientByName = async (db, req, res, nestedRes = false) => {
    let sql = `SELECT * FROM ingredients WHERE name = '${req.params.name}'`;
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `Ingredient '${req.params.name}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${result.rows.length}' ingredients`);
                })
        }
        else{
            res.send({
                message: `Ingredient '${req.params.name}' fetched successfully.`,
                result
            })
        }
        return result.rows[0]
    } catch (err) {
        res.send(err);
    }
};
// Get ingredient by id
const getIngredientByID = async (db, req, res, nestedRes = false) => {
    let id = nestedRes? req : req.params.id
    let sql = `SELECT * FROM ingredients WHERE id = '${id}'`;
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `Ingredient '${id}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${result.rows.length}' ingredients`);
                })
        }
        else{
            res.send({
                message: `Ingredient '${id}' fetched successfully.`,
                result
            })
        }
        return result.rows[0]
    } catch (err) {
        res.send(err);
    }
};

// Get multiple ingredients
const getMultipleIngredients = async (db, req, res, nestedRes = false) => {
    let ingredients = nestedRes? req : req.body.ingredients
    let allIngredients = `'${ingredients[0]}'`
    ingredients.slice(1).forEach(ing =>
        allIngredients+=(`,'${ing}'`)
    )
    let sql = `SELECT * FROM ingredients WHERE name in (${allIngredients})`;
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `\nIngredients '${allIngredients}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${allIngredients}'`);
                }
            )
        }
        else{
            res.send({
                message: `Ingredients (${allIngredients}) fetched successfully.`,
                result
            });
        }
        return result.rows;
    } catch(err){
        res.send(err);
    }
};

module.exports = {
    addIngredientByName,
    removeIngredientByName,
    getIngredientByName,
    getIngredientByID,
    getAllIngredients,
    getMultipleIngredients,
    addMultipleIngredients
}