const format = require('pg-format');

//#region Add MaterialEntity
// Add MaterialEntity
const addMaterialEntity = async (db, req, res, nestedRes = false) => {
    let MaterialEntity = nestedRes? req : req.body.MaterialEntity
    // TODO: Fix query
    const sql = `INSERT INTO MaterialsBridge(name)  VALUES('${req.params.name}')`
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `MaterialEntity successfully added.`, 'utf8', () => {
                    console.log(`Added '${MaterialEntity}'.`);
                }
            )
        }
        else{
            res.send({
                message: `${MaterialEntity}  added successfully.`,
                result
            });
        }
        console.log(result)
        return result.rowCount;
    } catch(err){
        res.send(err);
    }
};
// Add multiple MaterialEntity
const addMultipleMaterialEntities = async (db, req, res, nestedRes = false) => {
    let materials = nestedRes? req : req.body.MaterialEntities
    // TODO: Fix query
    const sql = format(`INSERT INTO MaterialsBridge(recipeid, ingredientid, ing_amount)  VALUES %L ON CONFLICT DO NOTHING`, materials);
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `${result.rowCount} MaterialEntities added successfully.`, 'utf8', () => {
                    console.log(`Added '${result.rowCount}' MaterialEntities`);
                }
            )
        }
        else{
            res.send({
                message: `${result.rowCount} MaterialEntities added successfully.`,
                result
            });
        }
        return result.rowCount;
    } catch(err){
        res.send(err);
    }
};
//#endregion


//region Remove materialBridgeEntity
// Remove materialBridgeEntity by id
const removeMaterialEntityByID = async (db, req, res, nestedRes = false) => {
    let sql = `DELETE FROM MaterialsBridge WHERE id = ${req.params.id}`;
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `MaterialEntity successfully removed.`, 'utf8', () => {
                    console.log(`Removed entity '${req.params.id}'.`);
                }
            )
        }
        else{
            res.send({
                message: `Entity ${req.params.id} removed successfully.`,
                result
            });
        }
        return result.rowCount;
    } catch(err){
        res.send(err);
    }
};
//#endregion
//#region Get materialBridgeEntity
// Get all materialBridgeEntities
const getAllMaterialEntities = async (db, req, res, nestedRes = false) => {
    let sql = 'SELECT * FROM MaterialsBridge';
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `All MaterialEntities fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${result.rows.length}' entities`);
                })
        }
        else{
            res.send({
                message: `All MaterialEntities fetched successfully.`,
                result
            })
        }
        return result.rows;
    } catch (err) {
        res.send(err);
    }
};

// Get materialBridgeEntity by id
const getMaterialEntityByID = async (db, req, res, nestedRes = false) => {
    let sql = `SELECT * FROM MaterialsBridge WHERE id = ${req.params.id}`;
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `MaterialEntity '${req.params.id}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${result.rows.length}' MaterialEntities`);
                })
        }
        else{
            res.send({
                message: `MaterialEntity '${req.params.id}' fetched successfully.`,
                result
            })
        }
        return result.rows[0]
    } catch (err) {
        res.send(err);
    }
};
//#endregion

module.exports = {
    removeMaterialEntityByID,
    getAllMaterialEntities,
    getMaterialEntityByID,
    addMaterialEntity,
    addMultipleMaterialEntities
}