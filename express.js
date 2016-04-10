'use strict';

const express = require('express');
const app = express();

app.use('/public/', express.static(__dirname + '/app/public'));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/app/public/index.html');
});
app.use('/api/signup', function(req, res, next){

});


app.listen(3000, function(req, res){
});
