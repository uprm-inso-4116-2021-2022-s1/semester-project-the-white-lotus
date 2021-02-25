//#region Add Tone
// Add Tone
const addTone = (db, req, res) => {
    let Tone = {name: req.body.name}
    const sql = {
        text: 'INSERT INTO Tones(name)  VALUES($1)',
        values: [Tone.name],
    }
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result, recipe);
        res.send({
            message: 'Tone successfully added.',
            Tone
        });
    });
};
//#endregion
//region Remove Tone
// Remove Tone by id
const removeToneByID = (db, req, res) => {
    let sql = `DELETE FROM Tones WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Tone removed.`,
            result
        });
    });
};
//#endregion
//#region Get Tone
// Get all Tones
const getAllTones = (db, req, res) => {
    let sql = 'SELECT * FROM Tones';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `All Tones fetched successfully.`,
            result
        });
    });
};
// Get Tone by id
const getToneByID = (db, req, res) => {
    let sql = `SELECT * FROM Tones WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Tone with id ${req.params.id} fetched successfully.`,
            result
        });
    });
};
//#endregion

module.exports = {
    addTone,
    removeToneByID,
    getAllTones,
    getToneByID
}