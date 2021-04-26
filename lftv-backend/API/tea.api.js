// Create Tea table
// This is NOT to be used, just to show how it'd work
// const creatTeaTable = (db, req, res) => {
//     let sql = 'CREATE TABLE teas(id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY, type VARCHAR(255), name VARCHAR(255), tea_desc VARCHAR(1024))';
//     db.query(sql, (err, result) => {
//         if(err) {
//             console.log(err);
//             res.send(`Error, check console log.`);
//         }
//         console.log(result);
//         res.send(`Teas table created successfully.`);
//     });
// };

//#region Add Tea
// Create Tea
const addTea = (db, req, res) => {
    let tea = {type: req.body.type, name: req.body.name, tea_desc: req.body.tea_desc};
    let sql = `INSERT INTO teas(type, name, tea_desc) VALUES('${tea.type}', '${tea.name}', '${tea.tea_desc}')`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result, tea);
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
    let sql = `DELETE FROM teas WHERE name = '${req.params.name}'`;
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
const getAllTeas = async (db, req, res, nestedRes= false) => {
    let sql = `SELECT * FROM teas where id != 23`;
    try {
        const teas = await db.query(sql);
        if (nestedRes){
            res.write(
                `All teas fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${teas.rows.length}' teas`);
                })
            return teas.rows;
        }
        else{
            res.send({
                message: `All ${teas.rowCount} teas fetched successfully.`,
                teas
            })
        }
    } catch (err) {
        res.send(err);
    }
};


// Get teas by type
const getTeasByType = async (db, req, res, nestedRes = false) => {
    let sql = `SELECT * FROM teas WHERE type = '${req.params.type}'`;
    try {
        const teas = await db.query(sql);
        if (nestedRes){
            res.write(
                `All ${teas.rowCount} teas with type ${req.params.type} fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${req.params.type}' teas`);
                })
            return teas.rows;
        }
        else{
            res.send({
                message: `All ${teas.rowCount} teas with type ${req.params.type} fetched successfully.`,
                teas
            })
        }
    } catch (err) {
        res.send(err);
    }
};

// Get tea by id
const getTeaByID = async (db, req, res, nestedRes = false) => {
    const id = nestedRes? req : req.params.id
    let sql = `SELECT * FROM teas WHERE id = ${id}`;
    try {
        const teas = await db.query(sql);
        if (nestedRes){
            res.write(
                `Tea with id ${id} fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched tea with id '${id}'.`);
                })
            return teas.rows;
        }
        else{
            res.send({
                message: `Tea with id ${id} fetched successfully.`,
                teas
            })
        }
    } catch (err) {
        res.send(err);
    }
};

// Get tea by name
const getTeaByName =  async (db, req, res, nestedRes = false) => {
    const teaName = req.params === undefined? req : req.params.name
    let sql = `SELECT * FROM teas WHERE name = '${teaName}'`;
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `\nTea with name '${teaName}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${teaName}'`);
                }
            )
        }
        else{
            res.send({
                message: `Tea with name '${teaName}' fetched successfully.`,
                result
            });
        }
        return result.rows[0];
    } catch(err){
        res.send(err);
    }
};

// Get tea by filter
const getTeaByFilter = async (db, req, res, nestedRes = false) => {
    const type = req.body.type === undefined? null : `'${req.body.type}'`;
    const name = req.body.name === undefined? null : `'${req.body.name}'`;
    let sql = `select * 
                from teas
                where teas.type = coalesce(${type}, teas.type) 
                    and teas.name = coalesce(${name}, teas.name)`;
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `[${result.rowCount}] teas matched the request.`, 'utf8', () => {
                    console.log(`[${result.rowCount}] teas matched the request.`);
                })
            return result;
        }
        else{
            res.send({
                message: `[${result.rowCount}] teas matched the request.`,
                result
            })
        }
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