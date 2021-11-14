// const bcrypt = require('bcryptjs')
//
// async function Register (user, db){
//     bcrypt.hash(user.password, 10, async function(err, hashedPass) {
//         if(err){
//             return err.message;
//         }
//         user.password = hashedPass;
//         const sql = {
//             text: 'INSERT INTO users(name, address, email, phone, password, rank, recipes)  VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
//             values: [user.name, user.address, user.email, user.phone, user.password, user.rank, user.recipes],
//         }
//         const result = await db.query(sql);
//         return result;
//     })
// }
// //TODO: Fix
// async function Login (user, db){
//     const userDB = await GetUserByEmail(user.email, db);
//     if(userDB.rowCount !== 0){
//         bcrypt.compare(password, user.password, function(err, result) {
//             if(err) {
//                 throw new Error (err.message);
//             }
//             if(result) {
//                 let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '4h'})
//                 return {
//                     message: 'Login Successful!',
//                     token: token,
//                     user: user
//                 }
//             }else {
//                 throw new Error ('Password does not match.');
//             }
//         })
//     }
//     else {
//         throw new Error (`Error: No user with email '${user.email}' not found.`);
//     }
//     const sql = `SELECT * FROM users WHERE user.email = '${user.email}' and user.password = '${hashedPass}';
//     const result = await db.query(sql);
//     return result;
// }
//
// async function GetUserByEmail (email, db){
//     const sql = `SELECT * FROM users WHERE user.email = '${user.email}' and user.password = '${hashedPass}';
//         const result = await db.query(sql);
//         return result;
// }
//
// module.exports = {
//     Register,
//     Login,
//     GetUserByEmail
// }
