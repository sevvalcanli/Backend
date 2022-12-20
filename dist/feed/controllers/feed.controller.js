"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'psql-mock-database-cloud.postgres.database.azure.com',
    port: 5432,
    user: 'nyeyxmevfunlxxjepruhlwkw@psql-mock-database-cloud',
    password: 'uinfkybkvwvqucrkbtbifdhk',
    database: 'booking1671352922926pwhfujnavmcuwzyu',
});
const db = require('./queries');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.get('/users', db.getUsers);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));
const getUsers = (request, response) => {
    pool.query('SELECT * FROM bookings ORDER BY id', (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
    });
};
module.exports = {
    getUsers,
};
app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
//# sourceMappingURL=feed.controller.js.map