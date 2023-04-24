let Router = require('express').Router();

Router.get('/:table', (req, res) => {
    var table = req.params.table;
    pool.query(`SELECT * FROM ${table}`, (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send("Error during database connection.");
        } else {
            log(req.socket.remoteAddress, `//GET ALL//${table}// ${results.length} records`);
            results = DataSecurity(results);
            res.status(200).send(results);
        }
    });
});

// GET RECORDS BY FIELD
Router.get('/:table/:field/:value', tokencheck(), (req, res) => {
    var table = req.params.table;
    var field = req.params.field;
    var value = req.params.value;
    pool.query(`SELECT * FROM ${table} WHERE ${field}=?`, [value] , (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send("Error during database connection.");
        } else {
            log(req.socket.remoteAddress, `//GET RECORDS BY FIELD//${table}->${field}->${value}// ${results.length} records`);
            results = DataSecurity(results);
            res.status(200).send(results);
        }
    });
});

// INSERT RECORD
Router.post('/:table', (req, res) => {
    var table = req.params.table;
    var records = req.body;
    var str = '';
    var str2 = '';

    var fields = Object.keys(records);
    var values = Object.values(records);
    for (let i = 0; i < fields.length; i++) {
        str2 += "," + field
        if (value == null || value == "" || value == undefinded) {
            str += ",NULL"
        }else {
            value = value.replaceAll("'", "\\'").replaceAll('"', '\\"')
            str += ",'" + value + "'"
        }
        
    }

    pool.query(`INSERT INTO ${table} (${str2}) VALUES(${str})`, (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send(err);
        } else {
            log(req.socket.remoteAddress, `${results.affectedRows} record inserted to ${table} table.`);
            res.status(200).send(results);
        }
    });
});

function DataSecurity(results){
    results.forEach(item => {
        item.password = undefined;
    });
    return results;
}

module.exports = Router;