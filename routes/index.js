var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var serviceRouter = require('./service');
var employeeRouter = require('./employee');

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

// router for employee
router.use('/employees', employeeRouter);
// router for employee

module.exports = router;
