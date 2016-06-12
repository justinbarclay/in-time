'use strict';
let process = require("process");

module.exports = {
    "postgres": process.env.DATABASE_URL,
    "port": process.env.PORT || 8888,
    "secret": process.env.SECRET,
    "domain": process.env.TSDOMAIN
};
