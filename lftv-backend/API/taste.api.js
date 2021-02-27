//#region Add taste
// Add taste
const addTaste = (db, req, res) => {
    let taste = {name: req.params.name}
    const sql = `INSERT INTO taste(name)  VALUES('${req.params.name}')`
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
    let sql = `DELETE FROM taste WHERE name = '${req.params.name}'`;
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
const getAllTastes = (db, req, res) => {
    let sql = 'SELECT * FROM taste';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `All tastes fetched successfully.`,
            result
        });
    });
};
// Get taste by name
const getTasteByName = (db, req, res) => {
    let sql = `SELECT * FROM taste WHERE name = '${req.params.name}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        const taste = result.rows[0]
        console.log(taste);
        res.send({
            message: `Taste '${req.params.name}' fetched successfully.`,
            taste
        });
    });
};
//#endregion

module.exports = {
    addTaste,
    removeTasteByName,
    getAllTastes,
    getTasteByName
}