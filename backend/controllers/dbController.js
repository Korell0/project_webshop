let Router = require('express').Router();

// GET ALL RECORDS
Router.get('/:table', (req, res) => {
    var table = req.params.table;
    pool.query(`SELECT * FROM ${table}`, (err, results) => {
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
Router.get('/:table/:field/:value', tokencheck(), (req, res) => {
    var table = req.params.table;
    var field = req.params.field;
    var value = req.params.value;
    pool.query(`SELECT * FROM ${table} WHERE ${field}=?`, [value] , (err, results) => {
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
Router.post('/:table', (req, res) => {
    var table = req.params.table;
    var sqlData = CreateSQLdata(req.body)

    pool.query(`INSERT INTO ${table} (${sqlData.fields_text}) VALUES(${sqlData.values_text})`, sqlData.values, (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send("Error during database connection.");
        } else {
            log(req.socket.remoteAddress, `//INSERT RECORD// ${table} //${results.affectedRows} record inserted`);
            res.status(200).send(results);
        }
    });
});

// UPDATE RECORD
app.patch('/:table/:id', tokencheck(), (req, res) => {
    var table = req.params.table;
    var id = req.params.id;
    var sqlData = CreateSQLdata(req.body)

    pool.query(`UPDATE ${table} SET ${update_text} WHERE ID=${id}`, sqlData.values, (err, results) => {
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
app.delete('/:table/:field/:value', (req, res) => {
    var table = req.params.table;
    var field = req.params.field;
    var value = req.params.value;

    pool.query(`DELETE FROM ${table} WHERE ${field}=?`, [value], (err, results) => {
        if (err) {
            log(req.socket.remoteAddress, err);
            res.status(500).send("Error during database connection.");
        } else {
            log(req.socket.remoteAddress, `//DELETE RECORD BY FIELD// ${table} // ${results.affectedRows} record(s) deleted`);
            res.status(200).send(results);
        }
    });
});

function CreateSQLdata(records){
    var values = [];
    var fieldList = Object.keys(records);
    var fields_text = '';
    var values_text = '';
    var update_text = '';

    fieldList.forEach(field => {
        fields_text += `${field}, `;
        values_text += '?, ';
        update_text += `${field}=?, `

        if (fieldList[field] == null || fieldList[field] == "" || fieldList[field] == undefinded) {
            values.push("NULL"); // MAYBE NOT -----------------------------------------------------
        }else {
            values.push(fieldList[field]);
        }
    });

    // trim (', ') part of texts
    fields_text = fields_text.substring(0, fields_text.length-1);
    values_text = values_text.substring(0, values_text.length-1);
    update_text = update_text.substring(0, update_text.length-1);

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