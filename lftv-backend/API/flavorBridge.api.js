const format = require('pg-format');

//#region Add FlavorEntity
// Add FlavorEntity
const addFlavorEntity = async (db, req, res, nestedRes = false) => {
    let FlavorEntity = nestedRes? req : req.body.FlavorEntity
    // TODO: Fix query
    const sql = `INSERT INTO FlavorBridge(name)  VALUES('${FlavorEntity}')`
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `FlavorEntity successfully added.`, 'utf8', () => {
                    console.log(`Added '${FlavorEntity}'.`);
                }
            )
        }
        else{
            res.send({
                message: `${FlavorEntity}  added successfully.`,
                result
            });
        }
        console.log(result)
        return result.rowCount;
    } catch(err){
        res.send(err);
    }
};
// Add multiple FlavorEntity
const addMultipleFlavorEntities = async (db, req, res, nestedRes = false) => {
    let FlavorEntities = nestedRes? req : req.body.FlavorEntities
    let allFlavorEntities = `('${FlavorEntities[0]}')`
    FlavorEntities.slice(1).forEach( ing =>
        allFlavorEntities+=(`,('${ing}')`)
    )
    // TODO: Fix query
    const sql = format(`INSERT INTO FlavorBridge(tasteid, noteid, recipeid)  VALUES %L ON CONFLICT DO NOTHING`, FlavorEntities);
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `\n${result.rowCount} FlavorEntities added successfully.`, 'utf8', () => {
                    console.log(`Added '${result.rowCount}' FlavorEntities`);
                }
            )
        }
        else{
            res.send({
                message: `${result.rowCount} FlavorEntities added successfully.`,
                result
            });
        }
        return result.rowCount;
    } catch(err){
        res.send(err);
    }
};
//#endregion
//region Remove FlavorEntity
// Remove FlavorEntity by name
const removeFlavorEntityByID = async (db, req, res, nestedRes = false) => {
    let sql = `DELETE FROM FlavorBridge WHERE id = '${req.params.id}'`;
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `FlavorEntity successfully removed.`, 'utf8', () => {
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
//#region Get FlavorEntity
// Get all FlavorEntities
const getAllFlavorEntities = async (db, req, res, nestedRes = false) => {
    let sql = 'SELECT * FROM FlavorBridge';
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `All FlavorEntities fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${result.rows.length}' entities`);
                })
        }
        else{
            res.send({
                message: `All FlavorEntities fetched successfully.`,
                result
            })
        }
        return result.rows;
    } catch (err) {
        res.send(err);
    }
};
// Get FlavorEntity by id
const getFlavorEntityByID = async (db, req, res, nestedRes = false) => {
    let sql = `SELECT * FROM FlavorEntity WHERE id = '${req.params.id}'`;
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `FlavorEntity '${req.params.id}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${result.rows.length}' FlavorEntities`);
                })
        }
        else{
            res.send({
                message: `FlavorEntity '${req.params.id}' fetched successfully.`,
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
    addFlavorEntity,
    addMultipleFlavorEntities,
    removeFlavorEntityByID,
    getAllFlavorEntities,
    getFlavorEntityByID,
}