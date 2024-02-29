// store static data in this file

// reminderTime in hours
const appointmentTimeReminder = [24, 1];

/* Routes that don't need token to work */
const publicRoutes = [
    '/users/signIn',
    '/users/signUp',    
    '/users/confirmRegister',
];
/* Routes that don't need token to work */


module.exports = { publicRoutes, appointmentTimeReminder};