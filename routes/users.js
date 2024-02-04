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

/* Signup endpoint */
router.post('/signUp', userController.signUp);
/* Signup endpoint */

/* Signup confirmation endpoint */
router.get('/confirm/:token', userController.confirm);
/* Signup confirmation endpoint */
module.exports = router;
