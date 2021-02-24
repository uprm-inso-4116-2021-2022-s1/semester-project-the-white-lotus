// Create Recipe table
// This is NOT to be used, just to show how it'd work
const creatRecipeTable = (db, req, res) => {
    let sql = 'CREATE TABLE recipes(id int AUTO_INCREMENT, type VARCHAR(255), name VARCHAR(255), tea_desc VARCHAR(1024), PRIMARY KEY (id))';
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
    let recipe = {type: req.body.type, name: req.body.name, tea_desc: req.body.tea_desc};
    let sql = 'INSERT INTO teas SET ?';
    db.query(sql, recipe, (err, result) => {
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
    let sql = `DELETE FROM teas WHERE id = ${req.params.id}`;
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

// Remove recipe by name
const removeRecipeByName = (db, req, res) => {
    let sql = `DELETE FROM teas WHERE name = "${req.params.name}"`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `${req.params.name} Recipe removed.`,
            result
        });
    });
};
//#endregion

//#region Edit Recipe
// ALL EDITS ARE DONE BY ID AND NAME EXCEPT NAME EDIT (obviously)
// Edit type by id
const editTypeByID = (db, req, res) => {
    let newType = req.body.type;
    let sql = `UPDATE teas SET type = '${newType}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Type updated to ${newType}.`,
            result
        });
    });
};

// Edit type by name
const editTypeByName = (db, req, res) => {
    let newType = req.body.type;
    let sql = `UPDATE teas SET type = '${newType}' WHERE name = '${req.params.name}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Type updated to ${newType}.`,
            result
        });
    });
};

// Edit name by id
const editName = (db, req, res) => {
    let newName = req.body.name;
    let sql = `UPDATE teas SET name = '${newName}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Name updated to ${newName}.`,
            result
        });
    });
};

// Reminder: description on the table is tea_desc
// Edit desc by id
const editDescByID = (db, req, res) => {
    let newDesc = req.body.tea_desc;
    let sql = `UPDATE teas SET tea_desc = '${newDesc}' WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Description updated from recipe with id ${req.params.id}.`,
            result
        });
    });
};

// Edit desc by name
const editDescByName = (db, req, res) => {
    let newDesc = req.body.tea_desc;
    let sql = `UPDATE teas SET tea_desc = '${newDesc}' WHERE name = '${req.params.name}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Description updated from recipe with name ${req.params.name}.`,
            result
        });
    });
};
//#endregion

//#region Get recipe
// Get all teas
const getAllTeas = (db, req, res) => {
    let sql = 'SELECT * FROM teas';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `All teas fetched successfully.`,
            result
        });
    });
};

// Get teas by type
const getTeasByType = (db, req, res) => {
    let sql = `SELECT * FROM teas WHERE type = '${req.params.type}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `All teas with type ${req.params.type} fetched successfully.`,
            result
        });
    });
};

// Get recipe by id
const getTeaByID = (db, req, res) => {
    let sql = `SELECT * FROM teas WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Recipe with id ${req.params.type} fetched successfully.`,
            result
        });
    });
};

// Get recipe by name
const getTeaByName = (db, req, res) => {
    let sql = `SELECT * FROM teas WHERE name = '${req.params.name}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Recipe with name ${req.params.name} fetched successfully.`,
            result
        });
    });
};
//#endregion

module.exports = {
    creatTeaTable,
    addTea,
    removeTeaByID,
    removeTeaByName,
    editTypeByID,
    editTypeByName,
    editName,
    editDescByID,
    editDescByName,
    getAllTeas,
    getTeasByType,
    getTeaByID,
    getTeaByName
}