var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('Application'))

app.listen(8080);