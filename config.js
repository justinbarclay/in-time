'use strict';
let process = require("process");

module.exports = {
    "postgres": process.env.DATABASE_URL,
    "port": 8888,
    "secret": process.env.SECRET
};
