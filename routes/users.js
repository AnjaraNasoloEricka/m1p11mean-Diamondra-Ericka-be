var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Login endpoint */
router.post('/signIn',userController.login);
/* Login endpoint */


module.exports = router;
