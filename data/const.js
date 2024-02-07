// store static data in this file

/* Routes that don't need token to work */
const publicRoutes = [
    '/users/signIn',
    '/users/signUp',    
    '/users/confirmRegister',
];
/* Routes that don't need token to work */


module.exports = { publicRoutes };