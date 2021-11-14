//#region Add Tea
// Create Tea
const {GetAllTeas, GetTeasByType, GetTeaByID, GetTeaByName, GetTeaByFilter, AddTea, RemoveTeaByID, RemoveTeaByName} = require("../Controllers/TeaController");
//#region Add Tea
const addTea = (db, req, res) => {
    let tea = {type: req.body.type, name: req.body.name, tea_desc: req.body.tea_desc};
    try{
        const result = AddTea(tea, db);
        res.send({
            message: 'Tea successfully added.',
            tea
        });
    }
    catch(err){
        console.log(err);
        res.send(`Error, check console log.`);
    }
};
//#endregion

//region Remove Tea
// Remove tea by id
const removeTeaByID = (db, req, res) => {
    const id = req.params.id;
    try{
        const result = RemoveTeaByID(id, db)
        console.log(result);
        res.send({
            message: `Tea removed.`,
            result
        });
    }
    catch(err){
        console.log(err);
        res.send(`Error, check console log.`);
    }
};
// Remove tea by name
const removeTeaByName = (db, req, res) => {
    const name = req.params.name;
    try{
        const result = RemoveTeaByName(name, db);
       res.send({
           message: `${req.params.name} Tea removed.`,
           result
       });

    }
    catch(err){
       console.log(err);
       res.send(`Error, check console log.`);
    }
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
const getAllTeas = async (db, req, res, nestedRes= false) => {
    try {
        const teas = await GetAllTeas(db);
        res.send({
            message: `All ${teas.rowCount} teas fetched successfully.`,
            teas
        })
    } catch (err) {
        res.send(err);
    }
};

// Get teas by type
const getTeasByType = async (db, req, res, nestedRes = false) => {
    try {
        const type = req.params.type;
        const teas = await GetTeasByType(type, db);
        res.send({
            message: `All ${teas.rowCount} teas with type ${req.params.type} fetched successfully.`,
            teas
        })
    } catch (err) {
        res.send(err);
    }
};

// Get tea by id
const getTeaByID = async (db, req, res, nestedRes = false) => {
    const id = req.params.id;
    try {
        const tea = await GetTeaByID(id, db);
            res.send({
                message: `Tea with id ${id} fetched successfully.`,
                tea
            })
    } catch (err) {
        res.send(err);
    }
};

// Get tea by name
const getTeaByName =  async (db, req, res, nestedRes = false) => {
    const teaName = req.params.name
    try{
        const result = await GetTeaByName(teaName, db);
        res.send({
            message: `Tea with name '${teaName}' fetched successfully.`,
            result
        });
    } catch(err){
        res.send(err);
    }
};

// Get tea by filter
const getTeaByFilter = async (db, req, res, nestedRes = false) => {
    const type = req.body.type === undefined? null : `'${req.body.type}'`;
    const name = req.body.name === undefined? null : `'${req.body.name}'`;
    try {
        const result = await GetTeaByFilter(type, name, db);
        res.send({
            message: `[${result.rowCount}] teas matched the request.`,
            result
        })
    } catch (err) {
        res.send(err);
    }
};
//#endregion

module.exports = {
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
    getTeaByName,
    getTeaByFilter
}