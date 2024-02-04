var express = require('express');
var router = express.Router();
var usersRouter = require('./users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router for users (auth)
router.use('/users', usersRouter);
// router for users (auth)


module.exports = router;
