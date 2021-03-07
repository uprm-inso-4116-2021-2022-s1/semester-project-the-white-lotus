// Add note
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

//Add multiple notes
const addMultipleNotes = async (db, req, res, nestedRes = false) => {
    let notes = nestedRes? req : req.body.notes
    let allNotes = `('${notes[0]}')`
    notes.slice(1).forEach( ing =>
        allNotes+=(`,('${ing}')`)
    )
    const sql = `INSERT INTO notes(name) VALUES${allNotes} ON CONFLICT DO NOTHING`
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `${result.rowCount} notes added successfully.`, 'utf8', () => {
                    console.log(`Added '${result.rowCount}' notes`);
                }
            )
        }
        else{
            res.send({
                message: `${result.rowCount} notes added successfully.`,
                result
            });
        }
        console.log(result)
        return result.rowCount;
    } catch(err){
        res.send(err);
    }
};

// Remove note by name
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

// Get all notes
const getAllNotes = async (db, req, res, nestedRes = false) => {
    let sql = 'SELECT * FROM Notes';
    try {
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `All notes fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${result.rows.length}' notes`);
                })
            return result.rows;
        }
        else{
            res.send({
                message: `All ${result.rowCount} notes fetched successfully.`,
                result
            })
        }
    } catch (err) {
        res.send(err);
    }
};

// Get Note by name
const getNoteByName = async (db, req, res, nestedRes = false) => {
    let name = nestedRes? req : req.params.name
    let sql = `SELECT * FROM Notes WHERE name = '${name}'`;
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `Note '${name}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${name}'`);
                }
            )
        }
        else{
            res.send({
                message: `Note '${name}' fetched successfully.`,
                result
            });
        }
        return result.rows[0];
    } catch(err){
        res.send(err);
    }
};
// Get Note by id
const getNoteByID = async (db, req, res, nestedRes = false) => {
    let id = nestedRes? req : req.params.id
    let sql = `SELECT * FROM Notes WHERE id = '${id}'`;
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `Note '${id}' fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched '${id}'`);
                }
            )
        }
        else{
            res.send({
                message: `Note '${id}' fetched successfully.`,
                result
            });
        }
        return result.rows[0];
    } catch(err){
        res.send(err);
    }
};
// Get multiple notes
const getMultipleNotes = async (db, req, res, nestedRes = false) => {
    let notes = nestedRes? req : req.body.notes
    let allNotes = `'${notes[0]}'`
    notes.slice(1).forEach( ing =>
        allNotes+=(`,'${ing}'`)
    )
    let sql = `SELECT * FROM notes WHERE name in (${allNotes})`;
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `\n${result.rows.length} notes fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched ${result.rows.length} notes`);
                }
            )
        }
        else{
            res.send({
                message: `${result.rows.length} notes fetched successfully.`,
                result
            });
        }
        return result.rows;
    } catch(err){
        res.send(err);
    }
};

module.exports = {
    addNote,
    addMultipleNotes,
    removeNoteByName,
    getAllNotes,
    getNoteByName,
    getNoteByID,
    getMultipleNotes
}