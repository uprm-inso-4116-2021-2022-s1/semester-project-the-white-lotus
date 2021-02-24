const testTea = require('./tester.tea');

const main = (db, req, res) => {
    console.log(`main method called for test ${req.params.test}.`);
    res.send(`main method called for test ${req.params.test}.`)

    switch(req.params.test) {
        case 'all':
            testTea.testTea(req, res);
            break;
        case 'tea':
            testTea.testTea(req, res);
            break;
        default: break;
    }
}

module.exports = {
    main
}