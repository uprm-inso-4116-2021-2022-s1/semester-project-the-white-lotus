const assert = require('assert');
const chai = require('chai');
const expect = chai.expect
const { Client } = require('pg');
const Enumerable = require("linq");
require('dotenv').config();
chai.use(require('chai-as-promised'));
const {GetAllRecipes, AddRecipe, GetRecipeByID, GetRecipeByTitle, RemoveRecipeByID, RemoveRecipeByTitle, GetFullRecipes,
    GetFullRecipeByID, GetRecipeByFilter
} = require("../Repositories/RecipeRepository");
const {Recipe} = require("../DTOs/Recipe");
const {Material} = require("../DTOs/Material");
const {RecipeFilter} = require("../DTOs/RecipeFilter");

describe("Recipes", function () {
    describe('Access to DB', function(){
        describe('#fail', function(){
            it('Connection was unsuccessful.', function(done){
                const db = new Client({
                    host: process.env.PGHOST,
                    user: process.env.PGUSER,
                    password: process.env.PGPASS,
                    database: process.env.PGDB,
                    port: process.env.PGPORT,
                    ssl: false,
                });
                db.connect(done);
            });
        })
    });
    const db = new Client({
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        password: process.env.PGPASS,
        database: process.env.PGDB,
        port: process.env.PGPORT,
        ssl: false,
    });
    before(function () {
        db.connect((err) => {
            if (err)
                throw err;
            console.log('Remote PostgresDB connected...');
        });
    });
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
    describe('Get All Recipes', function() {
        describe('#GetAllRecipes()', function() {
            it('Should return a value greater than 0 when db has stored recipes.', async function () {
                var recipes = await GetAllRecipes(db);
                assert.equal(recipes.length >= 0, true);
            });
        });
    })
    describe('Get Recipe By ID', function() {
        describe('#GetRecipeByID()', function () {
            it('Should return recipe with index 1.', async function () {
                // Recipe #1 is used for testing purposes.
                let recipe = await GetRecipeByID(1, db);
                assert.equal(recipe.rowCount >= 0, true);
                assert.equal(recipe.rows[0].id === 1, true);
                assert.equal(recipe.rows[0].title === "TEST_RECIPE", true);
                assert.equal(recipe.rows[0].difficulty === "DO NOT REMOVE", true);
                assert.equal(recipe.rows[0].yield === "DO NOT REMOVE", true);
                assert.equal(recipe.rows[0].procedure === "Recipe added for testing purposes. Do not remove for any reason.", true);
            });
        });
    });
    // FULL RECIPE
    describe('Get Full Recipes', function() {
        describe('#GetFullRecipes()', function () {
            it('Should return a value greater than 0 when db has stored recipes.', async function () {
                var recipes = await GetFullRecipes(db);
                assert.equal(recipes.length >= 0, true);
            });
        });
    });
    describe('Get Full Recipe By ID', function() {
        describe('#GetFullRecipesByID()', function () {
            it('Should return complete data of recipe with index 1.', async function () {
                // Recipe #1 is used for testing purposes.
                let recipe = await GetFullRecipeByID(1, db);
                assert.equal(recipe.rowCount >= 0, true);
                assert.equal(recipe.rows[0].id === 1, true);
                assert.equal(recipe.rows[0].title === "TEST_RECIPE", true);
                assert.equal(recipe.rows[0].teaname === "Test", true);
                assert.equal(recipe.rows[0].ingredients[0][0] === "TEST_RECIPE", true);
                assert.equal(recipe.rows[0].ingredients[0][1] === "DO NOT REMOVE", true);
                assert.equal(recipe.rows[0].note[0] === "fruity", true);
                assert.equal(recipe.rows[0].taste === "sweet", true);
            });
        });
    });
    describe('Get full recipe by ID (Negative)', function() {
        describe('#GetFullRecipeByID()', function () {
            it('Should not return a value since index does not exist in db.', async function () {
                var recipe = await GetFullRecipeByID(-1000, db);
                assert.equal(recipe.length >= 0, false);
            });
        });
    });
    // FILTER
    describe('Get full recipe by filter', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('Medium','HERBAL_TEA','sweet', ['fruity'], ['sugar'])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r => r.difficulty === "Medium"), true);
                assert.equal(Enumerable.from(recipes).all(r => r.teatype === "HERBAL_TEA"), true);
                assert.equal(Enumerable.from(recipes).all(r => r.taste === "sweet"), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.note).any(note => note === 'fruity')), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.ingredients).any(ingredient =>
                       ingredient[0] === 'sugar')), true);
            });
        });
    });
    describe('Get full recipe without specifying difficulty and using a filter', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter of any difficulty', async function () {
                let filter = new RecipeFilter('','HERBAL_TEA','sweet', ['fruity'], ['sugar'])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r => r.teatype === "HERBAL_TEA"), true);
                assert.equal(Enumerable.from(recipes).all(r => r.taste === "sweet"), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.note).any(note => note === 'fruity')), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.ingredients).any(ingredient =>
                        ingredient[0] === 'sugar')), true);
            });
        });
    });
    describe('Get full recipe without specifying tea type and using a filter', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('Medium','','sweet', ['fruity'], ['sugar'])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r => r.difficulty === "Medium"), true);
                assert.equal(Enumerable.from(recipes).all(r => r.taste === "sweet"), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.note).any(note => note === 'fruity')), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.ingredients).any(ingredient =>
                        ingredient[0] === 'sugar')), true);
            });
        });
    });
    describe('Get full recipe without specifying taste and using a filter', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('Medium','HERBAL_TEA','', ['fruity'], ['sugar'])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r => r.difficulty === "Medium"), true);
                assert.equal(Enumerable.from(recipes).all(r => r.teatype === "HERBAL_TEA"), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.note).any(note => note === 'fruity')), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.ingredients).any(ingredient =>
                        ingredient[0] === 'sugar')), true);
            });
        });
    });
    describe('Get full recipe without specifying notes and using a filter', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('Medium','HERBAL_TEA','sweet', [], ['sugar'])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r => r.difficulty === "Medium"), true);
                assert.equal(Enumerable.from(recipes).all(r => r.teatype === "HERBAL_TEA"), true);
                assert.equal(Enumerable.from(recipes).all(r => r.taste === "sweet"), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.ingredients).any(ingredient =>
                        ingredient[0] === 'sugar')), true);
            });
        });
    });
    describe('Get full recipe without specifying ingredients and using a filter', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('Medium','HERBAL_TEA','sweet', ['fruity'], [])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r => r.difficulty === "Medium"), true);
                assert.equal(Enumerable.from(recipes).all(r => r.teatype === "HERBAL_TEA"), true);
                assert.equal(Enumerable.from(recipes).all(r => r.taste === "sweet"), true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.note).any(note => note === 'fruity')), true);
            });
        });
    });
    describe('Get full recipe specifying taste only', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter of any difficulty', async function () {
                let filter = new RecipeFilter('','','sweet', [], [])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r => r.taste === "sweet"), true);
            });
        });
    });
    describe('Get full recipe specifying difficulty only', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('Medium','','', [], [])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r => r.difficulty === "Medium"), true);
            });
        });
    });
    describe('Get full recipe specifying tea type only', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('','HERBAL_TEA','', [], [])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r => r.teatype === "HERBAL_TEA"), true);
            });
        });
    });
    describe('Get full recipe specifying notes only', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('','','', ['fruity'], [])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.note).any(note => note === 'fruity')), true);
            });
        });
    });
    describe('Get full recipe specifying ingredients only', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('','','', [], ['sugar'])
                let recipes = await GetRecipeByFilter(filter, db);
                assert.equal(recipes.length >= 0, true);
                assert.equal(Enumerable.from(recipes).all(r =>
                    Enumerable.from(r.ingredients).any(ingredient =>
                        ingredient[0] === 'sugar')), true);
            });
        });
    });
    describe('Get full recipes without specifying anything', function() {
        describe('#GetRecipeByFilter()', function () {
            it('Should return recipes using filter', async function () {
                let filter = new RecipeFilter('','','', [], [])
                let recipes = await GetRecipeByFilter(filter, db);
                let allRecipes = await GetAllRecipes(db);
                assert.equal(allRecipes.length === recipes.length, true);
            });
        });
    });
    //#endregion

    //#region Add
    /******************** Add ********************/
    describe('Add recipe', function() {
        describe('#AddRecipe()', function () {
            it('Recipe should be added.', async function () {
                var recipe = new Recipe("AddRecipeTest",
                    "Easy",
                    "1 (8 ounce) serving",
                    "Infuse teabag in boiling water for 8-10 mins. Remove soaked teabag and leave brew to cool. Add 2 table spoons of syrup. Add mixture into glass half filled with ice cubes. Add strawberry, mango slices and mint leaves. Stir and serve.",
                    [
                        new Material("Strawberry and Mango Tea", "150 mL"),
                        new Material("agave syrup", "2 tablespoons"),
                    ],
                    "Test",
                    "sweet",
                    ["fruity"]
                )
                await AddRecipe(recipe, db);
                var recipeFromDB = await GetRecipeByTitle(recipe.title, db);
                await RemoveRecipeByTitle(recipe.title, db);
                assert.equal(recipeFromDB.rowCount === 1, true);
            });
        });
    });
    describe('Add recipe with duplicated title (Negative)', function() {
        describe('#AddRecipe()', function () {
            it('Recipe should not be added because a recipe with the same title already exists in the db.', async function () {
                var recipe = new Recipe("TEST_RECIPE",
                    "Easy",
                    "1 (8 ounce) serving",
                    "Infuse teabag in boiling water for 8-10 mins. Remove soaked teabag and leave brew to cool. Add 2 table spoons of syrup. Add mixture into glass half filled with ice cubes. Add strawberry, mango slices and mint leaves. Stir and serve.",
                    [
                        new Material("Strawberry and Mango Tea", "150 mL"),
                        new Material("agave syrup", "2 tablespoons"),
                    ],
                    "Test",
                    "sweet",
                    ["fruity"]
                )
                expect(AddRecipe(recipe, db)).to.be.rejectedWith("A recipe with the provided title already exists.")
                let recipeFromDB = await GetRecipeByTitle(recipe.title, db);
                assert.equal(recipeFromDB.rowCount === 1, true);
            });
        });
    });
    describe('Add recipe with invalid tea name', function() {
        describe('#AddRecipe', function () {
            it('Recipe should not be added because it does not have a valid tea name.', async function () {
                var recipe = new Recipe("AddRecipeTestWithInvalidTeaName",
                    "Easy",
                    "1 (8 ounce) serving",
                    "Infuse teabag in boiling water for 8-10 mins. Remove soaked teabag and leave brew to cool. Add 2 table spoons of syrup. Add mixture into glass half filled with ice cubes. Add strawberry, mango slices and mint leaves. Stir and serve.",
                    [
                        new Material("Strawberry and Mango Tea", "150 mL"),
                        new Material("agave syrup", "2 tablespoons"),
                    ],
                    "InvalidTea",
                    "sweet",
                    ["fruity"]
                )
                expect(AddRecipe(recipe, db)).to.be.rejectedWith(Error, "Provided tea does not exist in the database.")
                let recipeFromDB = await GetRecipeByTitle(recipe.title, db);
                assert.equal(recipeFromDB.rowCount === 0, true);
            });
        });
    });
    describe('Add recipe with invalid taste (Negative)', function() {
        describe('#AddRecipe()', function () {
            it('Recipe should not be added because it does not have a valid taste.', async function () {
                var recipe = new Recipe("AddRecipeTestWithInvalidTaste",
                    "Easy",
                    "1 (8 ounce) serving",
                    "Infuse teabag in boiling water for 8-10 mins. Remove soaked teabag and leave brew to cool. Add 2 table spoons of syrup. Add mixture into glass half filled with ice cubes. Add strawberry, mango slices and mint leaves. Stir and serve.",
                    [
                        new Material("Strawberry and Mango Tea", "150 mL"),
                        new Material("agave syrup", "2 tablespoons"),
                    ],
                    "Test",
                    "InvalidTaste",
                    ["fruity"]
                )
                expect(AddRecipe(recipe, db)).to.be.rejectedWith("Provided taste does not exist in the database.")
                let recipeFromDB = await GetRecipeByTitle(recipe.title, db);
                assert.equal(recipeFromDB.rowCount === 0, true);
            });
        });
    });
    describe('#Add recipe with invalid notes (Negative)', function() {
        describe('#AddRecipe', function () {
            it('Recipe should not be added because it does not have valid notes.', async function () {
                var recipe = new Recipe("AddRecipeTestWithInvalidNotes",
                    "Easy",
                    "1 (8 ounce) serving",
                    "Infuse teabag in boiling water for 8-10 mins. Remove soaked teabag and leave brew to cool. Add 2 table spoons of syrup. Add mixture into glass half filled with ice cubes. Add strawberry, mango slices and mint leaves. Stir and serve.",
                    [
                        new Material("Strawberry and Mango Tea", "150 mL"),
                        new Material("agave syrup", "2 tablespoons"),
                    ],
                    "Test",
                    "sweet",
                    ["InvalidNotes1", "InvalidNote2"]
                )
                expect(AddRecipe(recipe, db)).to.be.rejectedWith("None of the provided notes exist in the database.")
                let recipeFromDB = await GetRecipeByTitle(recipe.title, db);
                assert.equal(recipeFromDB.rowCount === 0, true);
            });
        });
    });
    //#endregion

    //#region Remove
    /******************** Remove ********************/
    describe('#Remove recipe by title', function() {
        describe('#RemoveRecipeByTitle()', function () {
            it('Recipe should be removed.', async function () {
                var recipe = new Recipe("RemoveRecipeByTitleTest",
                    "Easy",
                    "1 (8 ounce) serving",
                    "Infuse teabag in boiling water for 8-10 mins. Remove soaked teabag and leave brew to cool. Add 2 table spoons of syrup. Add mixture into glass half filled with ice cubes. Add strawberry, mango slices and mint leaves. Stir and serve.",
                    [
                        new Material("Strawberry and Mango Tea", "150 mL"),
                        new Material("agave syrup", "2 tablespoons"),
                    ],
                    "Test",
                    "sweet",
                    ["fruity"]
                )
                await AddRecipe(recipe, db);
                await RemoveRecipeByTitle(recipe.title, db);
                let recipeFromDB = await GetRecipeByTitle(recipe.title, db);
                assert.equal(recipeFromDB.rowCount === 0, true);
            });
        });
    });
    //#endregion
});
