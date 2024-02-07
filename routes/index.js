var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var serviceRouter = require('./service');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router for users (auth)
router.use('/users', usersRouter);
// router for users (auth)

// router for services
router.use('/services', serviceRouter);
// router for services

module.exports = router;
