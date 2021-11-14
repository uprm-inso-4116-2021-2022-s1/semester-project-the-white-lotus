const format = require("pg-format");
//#region Add Recipe
// Add new FunFact to database
const addFunFact =  async (db, req, res) => {
    const facts = req.body.facts
    const sql = format(`INSERT INTO FunFacts (funfact) VALUES %L`, facts);
    console.log(sql);
    db.query(sql, (err, result) => {
        if(err) {
            res.send(err);
        }
        console.log(result);
        res.send({
            message: 'Fun fact successfully added.',
            result
        });
    });
};
//#endregion

//region Remove FunFact
// Remove data by id
const removeFunFactByID = (db, req, res) => {
    let sql = `DELETE FROM FunFacts WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if(err) {
            console.log(err);
            res.send(`Error, check console log.`);
        }
        console.log(result);
        res.send({
            message: `FunFact removed.`,
            result
        });
    });
};
//#endregion

//#region Get data
// Get all FunFacts
const getAllFunFacts = async (db, req, res, nestedRes = false) => {
    let sql = 'SELECT * FROM FunFacts';
    try {
        const FunFacts = await db.query(sql);
        if (nestedRes){
            res.write(
                `${FunFacts.rowCount} FunFacts fetched successfully.`, 'utf8', () => {
                console.log(`Fetched '${FunFacts.rows.length}' fun facts!`);
            })
        }
        else{
            res.send({
                message: `${FunFacts.rowCount} fun facts fetched successfully.`,
                FunFacts
            });
        }
        return FunFacts.rows;
    } catch (err) {
        res.send(err);
    }
};
// Get data by id
const getFunFactByID = async (db, req, res, nestedRes = false) => {
    let id = nestedRes? req : req.params.id
    let sql = `SELECT * FROM FunFacts WHERE id = ${id}`;
    try{
        const result = await db.query(sql);
        if (nestedRes){
            res.write(
                `Fun fact with id = ${id} fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched with id = ${id} fun fact.`);
                })
        }
        else{
            res.send({
                message: `Fun fact with id = ${id} fetched successfully.`,
                result
            })
        }
        return result.rows[0]

    }catch(err){
        res.send(err)
    }
};

// Get random fact
const getRandomFact = async (db, req, res, nestedRes = false) => {
    const facts = await getAllFunFacts(db, req, res, true);
    const index = Math.floor(Math.random() * facts.length);
    const result = facts[index];
        if (nestedRes) {
            res.write(
                `Fun fact with id = ${result.id} fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched with id = ${result.id} fun fact.`);
                })
        }
        else {
            res.end(
                `\nFun fact with id = ${result.id} fetched successfully.`, 'utf8', () => {
                    console.log(`Fetched with id = ${result.id} fun fact.`);
                }
            );
        }
    return result
}

//#endregion

module.exports = {
    addFunFact,
    removeFunFactByID,
    getAllFunFacts,
    getFunFactByID,
    getRandomFact
}