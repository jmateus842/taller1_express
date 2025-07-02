var express = require('express');
var router = express.Router();

/* GET listado de usuarios. */
router.get('/', function(req, res, next) {
  res.send('responder con un recurso');
});

module.exports = router;
