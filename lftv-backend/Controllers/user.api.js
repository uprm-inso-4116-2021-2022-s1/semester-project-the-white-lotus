// const Enumerable = require("linq");
// const teaAPI = require("./tea.api");
// const ingredientAPI = require("./ingredient.api");
// const materialBridgeAPI = require("./materialBridge.api");
// const tastesAPI = require("./tastes.api");
// const notesAPI = require("./notes.api");
// const flavorBridgeAPI = require("./flavorBridge.api");
// const {AddUser, GetUserByFilter, GetFullUserByID, GetFullUsers, GetUserByID, GetAllUsers, RemoveUserByID, EditUser} = require("../Repositories/UserRepository");
// //#region Add User
// // Add new User to database
// const registerUser =  async (db, req, res) => {
//     let user = {
//         name: req.body.name,
//         address: req.body.address,
//         email: req.body.email,
//         phone: req.body.phone,
//         password: req.body.password,
//         rank: req.body.rank,
//         recipes: req.body.recipes
//     };
//     try{
//         await Register(user, db)
//         res.send({
//             message: `User "${user.name}" added successfully.`
//         });
//     }
//     catch(err){
//         res.send(err.message);
//     }
// };
//
// // Login
// const loginUser =  async (db, req, res) => {
//     let user = {
//         address: req.body.address,
//         email: req.body.email,
//     };
//     try{
//         await Login(user, db)
//         res.send({
//             message: `User "${user.name}" added successfully.`
//         });
//     }
//     catch(err){
//         res.send(err.message);
//     }
// };
//
//
// //region Remove User
// // Remove data by id
// const removeUserByID = async (db, req, res) => {
//     const id = req.params.id;
//     try{
//         const result = await RemoveUserByID(id, db);
//         res.send({
//             message: `User removed.`,
//             result
//         });
//     }catch(err){
//         res.send(`Error, check console log.`);
//         console.log(result);
//     }
// };
// //#endregion
//
// //#region Edit User
// // Edit data by id
// const editUser = async (db, req, res) => {
//     const newUser = {
//         id: req.params.id,
//         title: req.params.title,
//         yield: req.params.yield,
//         difficulty: req.params.difficulty,
//         procedure: req.params.procedure,
//         teaName: req.params.teaName,
//         materials: req.params.materials,
//         notes: req.params.notes,
//         taste: req.params.taste,
//     }
//     try{
//         const result = await EditUser(newUser, db);
//         res.send({
//             message: `User ${newUser.id} was updated.`,
//             result
//         });
//     }catch(err){
//         res.send(err.message)
//     }
// }
//
// //#endregion
//
// //#region Get data
// // Get all users
// const getAllUsers = async (db, req, res, nestedRes = false) => {
//     try {
//         const users = await GetAllUsers(db);
//         res.send({
//             message: `All ${users.rowCount} users fetched successfully.`,
//             users
//         });
//         return users.rows;
//     } catch (err) {
//         res.send(err.message);
//     }
// };
//
// // Get data by id
// const getUserByID = async (db, req, res, nestedRes = false) => {
//     let id =  req.params.id;
//     try{
//         const result = await GetUserByID(id, db);
//         res.send({
//             message: `User '${result.rows[0].id}' fetched successfully.`,
//             result
//         })
//         return result.rows[0]
//
//     }catch(err){
//         res.send(err.message)
//     }
// };
//
// module.exports = {
//     registerUser,
//     loginUser,
//     removeUserByID,
//     editUser,
//     getAllUsers,
//     getUserByID
// }
