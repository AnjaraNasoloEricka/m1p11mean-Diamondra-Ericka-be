var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var serviceRouter = require('./service');
var employeeRouter = require('./employee');
var appointmentRouter = require('./appointment');
var customerRouter = require('./customer');
var statRouter = require('./stat');

module.exports = (server) => {
  const { initIoSocket } = require('../services/socketIOService')(server);

  /* Init socket */
  const socketIO = initIoSocket();
  const {sendNotification} = require('../services/modelServices/notificationService')(socketIO);
  var specialOfferRouter = require('./specialOffer')(socketIO);
  /* Init socket */

  router.get('/notif', function(req,res){
    sendNotification();
  })
  
  var taskRouter = require('./task');

  /* GET home page. */
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  // router for expenses
  router.use('/expense', require('./expense'));
  // router for expenses

  // router for users (auth)
  router.use('/users', usersRouter);
  // router for users (auth)

  // router for services
  router.use('/services', serviceRouter);
  // router for services

  // router for employee
  router.use('/employees', employeeRouter);
  // router for employee

  // router for appointment
  router.use('/appointments', appointmentRouter);
  // router for appointment

  // router for employee schedule
  router.use('/schedules', require('./schedule'));
  // router for employee schedule

  // router for special offer
  router.use('/specialOffers', specialOfferRouter);
  // router for special offer

  // router for customers
  router.use('/customers', customerRouter);
  // router for customers

  // router for tasks
  router.use('/tasks', taskRouter);
  // router for tasks

  // router for stat
  router.use('/stat', statRouter);
  // router for stat


  return router;
}


// module.exports = router;
