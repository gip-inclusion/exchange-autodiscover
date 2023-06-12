const express = require('express');
const router = express.Router();

/* GET home page. */
router.post('/autodiscover.xml', function(req, res, next) {
  res.end("coucou");
});

module.exports = router;

