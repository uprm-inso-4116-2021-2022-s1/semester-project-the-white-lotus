//#region Add taste
// Add taste
const addTaste = (db, req, res) => {
    let taste = {name: req.params.name}
    const sql = `INSERT INTO tastes(name)  VALUES('${req.params.name}')`
    db.query(sql, (err, result) => {
        if(err) {
            res.send(err);
        }
        console.log(result, taste);
        res.send({
            message: 'Taste successfully added.',
            taste
        });
    });
};
//#endregion
//region Remove taste
// Remove taste by name
const removeTasteByName = (db, req, res) => {
    let sql = `DELETE FROM tastes WHERE name = '${req.params.name}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Taste removed.`,
            result
        });
    });
};
//#endregion
//#region Get taste
// Get all tastes
const getAllTastes = async (db, req, res, nestedRes = false) => {
    let sql = 'SELECT * FROM tastes';
    try {
        const tastes = await db.query(sql);
        if (nestedRes){
            res.write(
                `All tastes fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${tastes.rows.length}' ingredients`);
                })
        }
        else{
            res.send({
                message: `All tastes fetched successfully.`,
                tastes
            })
        }
        return tastes.rows;
    } catch (err) {
        res.send(err);
    }
};
// Get taste by name
const getTasteByName = async (db, req, res, nestedRes) => {
    let name = nestedRes? req : req.params.name;
    let sql = `SELECT * FROM tastes WHERE name = '${name}'`;
    try {
        const taste = await db.query(sql);
        if (nestedRes){
            res.write(
                `\nTaste '${name}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${taste.rows.length}' taste`);
                })
        }
        else{
            res.send({
                message: `Taste '${name}' fetched successfully.`,
                taste
            })
        }
        return taste.rows[0]
    } catch (err) {
        res.send(err);
    }
};
//#endregion

module.exports = {
    addTaste,
    removeTasteByName,
    getAllTastes,
    getTasteByName
}