// Add tea

async function AddTea(tea, db){
    let sql = `INSERT INTO teas(type, name, tea_desc) VALUES('${tea.type}', '${tea.name}', '${tea.tea_desc}')`;
    const result = db.query(sql);
    return result;
}

// Remove tea By id
async function RemoveTeaByID (id, db){
    let sql = `DELETE FROM teas WHERE id = ${id}`;
    const result = db.query(sql);
    return result;
}

// Remove tea by name
async function RemoveTeaByName (name, db){
    let sql = `DELETE FROM teas WHERE name = '${name}'`;
    const result = db.query(sql);
    return result;
}

// Get all teas
async function GetAllTeas (db){
    let sql = `SELECT * FROM teas`;
    const teas = await db.query(sql);
    return teas;
}

// Get teas by type
async function GetTeasByType (type, db){
    let sql = `SELECT * FROM teas WHERE type = '${type}'`;
    const teas = await db.query(sql);
    return teas;
}

// Get tea by id
async function GetTeaByID(id, db){
    let sql = `SELECT * FROM teas WHERE id = ${id}`;
    const teas = await db.query(sql);
    return teas;
}

// Get tea by name
async function GetTeaByName(name, db){
    let sql = `SELECT * FROM teas WHERE name = '${name}'`;
    const result = await db.query(sql);
    return result;
}

// Get teas by filter
async function GetTeaByFilter (type, name, db){
    let sql = `select * 
                from teas
                where teas.type = coalesce(${type}, teas.type) 
                    and teas.name = coalesce(${name}, teas.name)`;
    const result = await db.query(sql);
    return result;
}
module.exports = {
    AddTea,
    RemoveTeaByID,
    RemoveTeaByName,
    GetAllTeas,
    GetTeasByType,
    GetTeaByID,
    GetTeaByName,
    GetTeaByFilter
}