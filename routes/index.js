var express = require('express');
var router = express.Router();

const response = require('../config/response');

/* GET home page. */
router.get('/', function(req, res, next) {
  response.data(req, res, { welcome: 'Travelgrid initiated' });
});

module.exports = router;



