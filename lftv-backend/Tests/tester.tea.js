const axios = require('axios');
const chai = require('chai'); // https://www.chaijs.com/api/assert/ , Assert library

const testTea = (req, res) => {

    let lastID;

    //#region Test Get methods
    console.log("Testing 'gettea' route...");
    axios({
        method: 'get',
        url: 'http://localhost:3000/gettea'
    })
        .then(result => {
            lastID = parseInt(result.data.result[result.data.result.length-1].id); //making sure it's an int
            //console.log("last id is ", lastID);
            //console.log(result.data.result[result.data.result.length-1]);

            // ID number must always be equal or greater than the number of teas stored in DB.
            chai.assert.isAtLeast(lastID, result.data.result.length, `${lastID} >= ${result.data.result.length}`);
            console.log("'gettea' route passed.");
        })
        .catch(err => console.log(err));


    //#endregion

    // Teas to test with
    const tea1 = {
        type: "TEST_TEA",
        name: "test tea 1",
        tea_desc: "This tea is for testing purposes."
    };
    const tea2 = {
        type: "TEST_TEA",
        name: "test tea 2",
        tea_desc: "This tea is for testing purposes."
    };

    //#region Test Add method
    // axios({
    //     method: 'get',
    //     url: 'http://localhost:3000/addpost',
    //     data: tea1
    // })
    //     .then(result => {
    //         console.log("Added tea1 object.");
    //         console.log(result);
    //     })
    //     .catch(err => console.log(err));
    //
    // axios({
    //     method: 'get',
    //     url: 'http://localhost:3000/addpost',
    //     data: tea2
    // })
    //     .then(result => {
    //         console.log("Added tea2 object.");
    //         console.log(result);
    //     })
    //     .catch(err => console.log(err));
    //#endregion

    //#region Test Edit methods
    //#endregion

    //#region Test Remove methods
    //#endregion
};

module.exports = { testTea };