const testTea = require('./tester.tea');

const main = (db, req, res) => {
    console.log(`main method called for test ${req.params.test}.`);
    res.send(`main method called for test ${req.params.test}.`)

    switch(req.params.test) {
        case 'tea': testTea.testTea(db, req, res); break;
        default: break;
    }
}

module.exports = {
    main
}