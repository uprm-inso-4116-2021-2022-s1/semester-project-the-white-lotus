//#region Add Note
// Add Note
const addNote = (db, req, res) => {
    let tone = {name: req.params.name}
    const sql = {
        text: 'INSERT INTO Notes(name)  VALUES($1)',
        values: [tone.name],
    }
    db.query(sql, (err, result) => {
        if(err) {
            res.send(err);
        }
        console.log(result, tone);
        res.send({
            message: 'Note successfully added.',
            tone
        });
    });
};
const addMultipleNotes = async (db, req, res) => {
    let notes = req.body.notes
    let allNotes = `('${notes[0]}')`
    notes.slice(1).forEach( ing =>
        allNotes+=(`,('${ing}')`)
    )
    const sql = `INSERT INTO notes(name) VALUES${allNotes} ON CONFLICT DO NOTHING`
    try{
        const result = await db.query(sql);
        res.send({
            message: `${result.rowCount} notes added successfully.`,
            result
        });
        console.log(result)
        return result.rowCount;
    } catch(err){
        res.send(err);
    }
};
//#endregion
//region Remove Note
// Remove Note by name
const removeNoteByName = (db, req, res) => {
    let sql = `DELETE FROM Notes WHERE name = '${req.params.name}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `Note removed.`,
            result
        });
    });
};
//#endregion
//#region Get Note
// Get all Notes
const getAllNotes = (db, req, res) => {
    let sql = 'SELECT * FROM Notes';
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `All Notes fetched successfully.`,
            result
        });
    });
};
// Get Note by name
const getNoteByName = (db, req, res) => {
    let sql = `SELECT * FROM Notes WHERE name = '${req.params.name}'`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        const tone = result.rows[0]
        console.log(tone);
        res.send({
            message: `Note '${req.params.name}' fetched successfully.`,
            tone
        });
    });
};

// Get multiple notes
const getMultipleNotes = async (db, req, res) => {
    let notes = req.body.notes
    let allNotes = `'${notes[0]}'`
    notes.slice(1).forEach( ing =>
        allNotes+=(`,'${ing}'`)
    )
    let sql = `SELECT * FROM notes WHERE name in (${allNotes})`;
    try{
        const result = await db.query(sql);
        res.send({
            message: `${result.rows.length} notes fetched successfully.`,
            result
        });
        console.log(result.rows)
        return result.rows;
    } catch(err){
        res.send(err);
    }
};
//#endregion

module.exports = {
    addNote,
    addMultipleNotes,
    removeNoteByName,
    getAllNotes,
    getNoteByName,
    getMultipleNotes
}