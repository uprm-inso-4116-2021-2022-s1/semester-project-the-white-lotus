// Create Tea table
// This is NOT to be used, just to show how it'd work
const creatTeaTable = (db, req, res) => {
    let sql = 'CREATE TABLE teas(id int AUTO_INCREMENT, type VARCHAR(255), name VARCHAR(255), tea_desc VARCHAR(1024), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send(`Teas table created successfully.`);
    });
};

//#region Add Tea
// Create Tea
const addTea = (db, req, res) => {
    let tea = {type: req.body.type, name: req.body.name, tea_desc: req.body.tea_desc};
    let sql = 'INSERT INTO teas SET ?';
    db.query(sql, tea, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        //console.log(result, tea);
        res.send({
            message: 'Tea successfully added.',
            tea
        });
    });
};
//#endregion

//region Remove Tea
// Remove tea by id
const removeTeaByID = (db, req, res) => {
    let sql = `DELETE FROM teas WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Tea removed.`,
            result
        });
    });
};

// Remove tea by name
const removeTeaByName = (db, req, res) => {
    let sql = `DELETE FROM teas WHERE name = "${req.params.name}"`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `${req.params.name} Tea removed.`,
            result
        });
    });
};
//#endregion

//#region Edit Tea
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
            message: `Description updated from tea with id ${req.params.id}.`,
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
            message: `Description updated from tea with name ${req.params.name}.`,
            result
        });
    });
};
//#endregion

//#region Get tea
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

// Get tea by id
const getTeaByID = (db, req, res) => {
    let sql = `SELECT * FROM teas WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Tea with id ${req.params.type} fetched successfully.`,
            result
        });
    });
};

// Get tea by name
const getTeaByName = (db, req, res) => {
    let sql = `SELECT * FROM teas WHERE name = '${req.params.name}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Tea with name ${req.params.name} fetched successfully.`,
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