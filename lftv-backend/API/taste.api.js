//#region Add Taste
// Add Taste
const addTaste = (db, req, res) => {
    let taste = {name: req.body.name}
    const sql = {
        text: 'INSERT INTO Taste(name)  VALUES($1)',
        values: [taste.name],
    }
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result, taste);
        res.send({
            message: 'Taste successfully added.',
            taste
        });
    });
};
//#endregion
//region Remove Taste
// Remove Taste by id
const removeTasteByID = (db, req, res) => {
    let sql = `DELETE FROM Taste WHERE id = ${req.params.id}`;
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
//#region Get Tastes
// Get all Tastes
const getAllTastes = (db, req, res) => {
    let sql = 'SELECT * FROM Taste';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `All Tastes fetched successfully.`,
            result
        });
    });
};
// Get Taste by id
const getTasteByID = (db, req, res) => {
    let sql = `SELECT * FROM Taste WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Taste with id ${req.params.id} fetched successfully.`,
            result
        });
    });
};
//#endregion

module.exports = {
    addTaste,
    removeTasteByID,
    getAllTastes,
    getTasteByID
}