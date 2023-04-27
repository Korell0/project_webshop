let Router = require('express').Router();
let config = require('../modules/config');
let log = require('../modules/logging.js');



/* 
    GET ALL: /table
    GET RECORDS BY FIELD: /table/field/value
    INSERT RECORD: /table
    UPDATE RECORD: /table/ID
    DELETE RECORD BY FIELD: /table/field/value
*/

// GET ALL RECORDS
Router.get('/:table',  (req, res) => {
    var table = req.params.table;
    config.pool.query(`SELECT * FROM ${table}`, (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send("Error during database connection.");
        } else {
            log(req.socket.remoteAddress, `//GET ALL// ${table} // ${results.length} records`);
            results = DataSecurity(results);
            res.status(200).send(results);
        }
    });
});

// GET RECORDS BY FIELD
Router.get('/:table/:field/:value',  (req, res) => {
    var table = req.params.table;
    var field = req.params.field;
    var value = req.params.value;
    config.pool.query(`SELECT * FROM ${table} WHERE ${field}=?`, [value] , (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send("Error during database connection.");
        } else {
            log(req.socket.remoteAddress, `//GET RECORDS BY FIELD//${table}->${field}->${value}// ${results.length} record(s)`);
            results = DataSecurity(results);
            res.status(200).send(results);
        }
    });
});

// INSERT RECORD
Router.post('/:table',  (req, res) => {
    var table = req.params.table;
    var sqlData = CreateSQLdata(req.body)
    config.pool.query(`INSERT INTO ${table} (${sqlData.fields_text}) VALUES(${sqlData.values_text})`, sqlData.values, (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send("Error during database connection.");
        } else {
            log(req.socket.remoteAddress, `//INSERT RECORD// ${table} //${results.affectedRows} record inserted`);
            res.status(200).send(results);
        }
    });
});

// UPDATE RECORD BY ID
Router.patch('/:table/:id',  (req, res) => {
    var table = req.params.table;
    var id = req.params.id;
    var sqlData = CreateSQLdata(req.body)

    config.pool.query(`UPDATE ${table} SET ${sqlData.update_text} WHERE ID=${id}`, sqlData.values, (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send("Error during database connection.");
        } else {
            log(req.socket.remoteAddress, `//UPDATE RECORD// ${table} //${results.affectedRows} record updated`);
            res.status(200).send(results);
        }
    });
});

// DELETE RECORD BY FIELD
Router.delete('/:table/:field/:value',  (req, res) => {
    var table = req.params.table;
    var field = req.params.field;
    var value = req.params.value;

    config.pool.query(`DELETE FROM ${table} WHERE ${field}=?`, [value], (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send("Error during database connection.");
        } else {
            log(req.socket.remoteAddress, `//DELETE RECORD BY FIELD// ${table} // ${results.affectedRows} record(s) deleted`);
            res.status(200).send(results);
        }
    });
});

// Create data for sql querry
function CreateSQLdata(records){
    var values = [];
    var fieldList = Object.keys(records);
    var fields_text = '';
    var values_text = '';
    var update_text = '';

    for (let i = 0; i < fieldList.length; i++) {
        fields_text += `${fieldList[i]}, `;
        values_text += `NULLIF(?, ''), `;
        update_text += `${fieldList[i]}=NULLIF(?, ''), `

        if (fieldList[i] == null || fieldList[i] == "" || fieldList[i] == undefined) {
            values.push('');
        } else {
            values.push(records[fieldList[i]]);
        }
    }

    // trim (', ') part of texts
    fields_text = fields_text.substring(0, fields_text.length-2);
    values_text = values_text.substring(0, values_text.length-2);
    update_text = update_text.substring(0, update_text.length-2);

    return {
        values: values,
        fields_text: fields_text,
        values_text: values_text,
        update_text: update_text
    }
}

// Disable password returning
function DataSecurity(results){
    results.forEach(item => {
        item.password = undefined;
    });
    return results;
}

module.exports = Router;