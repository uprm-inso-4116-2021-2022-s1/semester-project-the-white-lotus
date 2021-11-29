const assert = require('assert');
const chai = require('chai');
const expect = chai.expect
const { Client } = require('pg');
const Enumerable = require("linq");
require('dotenv').config();
chai.use(require('chai-as-promised'));
const {GetAllTeas, GetTeaByID, AddTea, RemoveTeaByID, GetTeaByName, RemoveTeaByName
} = require("../Repositories/TeaRepository");
const {Tea} = require("../DTOs/Tea");
const {db} = require("./testFixture");

describe("Teas", function () {
    after(async function () {
        await db.end((err) => {
            if (err)
                throw err;
            console.log('Remote PostgresDB disconnected.')
        })
    });

    //#region Get
    /******************** Get ********************/
    // RECIPE
    describe('Get All Teas', function() {
        describe('#GetAllTeas()', function() {
            it('Should return a value greater than 0 when db has stored teas.', async function () {
                var teas = await GetAllTeas(db);
                assert.equal(teas.rowCount >= 0, true);
            });
        });
    })
    describe('Get Tea By ID', function() {
        describe('#GetTeaByID()', function () {
            it('Should return tea with index 31.', async function () {
                // Tea #1 is used for testing purposes.
                let tea = await GetTeaByID(31, db);
                assert.equal(tea.rowCount >= 0, true);
                assert.equal(tea.rows[0].id === 31, true);
                assert.equal(tea.rows[0].name === "Test Tea", true);
                assert.equal(tea.rows[0].tea_desc === "Do not delete.", true);
            });
        });
    });
    //#endregion

    //#region Add
    /******************** Add ********************/
    describe('Add tea', function() {
        describe('#AddTea()', function () {
            it('Tea should be added.', async function () {
                var tea = new Tea("TEST_TYPE", "AddTeaTest", "Add Tea Test")
                var id = await AddTea(tea, db);
                id = id.rows[0].id;
                var teaFromDB = await GetTeaByID(id, db);
                await RemoveTeaByID(id, db);
                assert.equal(teaFromDB.rowCount === 1, true);
            });
        });
    });
    describe('Add tea with duplicated name (Negative)', function() {
        describe('#AddTea()', function () {
            it('Tea should not be added because a tea with the same title already exists in the db.', async function () {
                var tea = new Tea("HERBAL_TEA", "Test Tea", "Duplicated name")
                expect(AddTea(tea, db)).to.be.rejectedWith("A tea with the provided name already exists.")
                let teaFromDB = await GetTeaByName(tea.name, db);
                assert.equal(teaFromDB.rowCount === 1, true);
            });
        });
    });
    //#endregion

    //#region Remove
    /******************** Remove ********************/
    describe('Remove tea by name', function() {
        describe('#RemoveTeaByName()', function () {
            it('Tea should be removed using the given name.', async function () {
                var tea = new Tea("TEST_TYPE", "RemoveTeaByNameTest", "Remove Tea By Name Test")
                var id = await AddTea(tea, db);
                id = id.rows[0].id;
                await RemoveTeaByName(tea.name, db);
                let teaFromDB = await GetTeaByID(id, db);
                assert.equal(teaFromDB.rowCount === 0, true);
            });
        });
    });
    describe('Remove tea by id', function() {
        describe('#RemoveTeaByID()', function () {
            it('Tea should be removed using the given id.', async function () {
                var tea = new Tea("TEST_TYPE", "RemoveTeaByNameTest", "Remove Tea By Name Test")
                var id = await AddTea(tea, db);
                id = id.rows[0].id;
                await RemoveTeaByID(id, db);
                let teaFromDB = await GetTeaByID(id, db);
                assert.equal(teaFromDB.rowCount === 0, true);
            });
        });
    });
    //#endregion
});
