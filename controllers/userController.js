const userService = require('../services/modelServices/userService');

const userController = {
    /* Login controller for all users */
     login: async (req, res) => {
        const { email, password } = req.body;
        await userService.login(email, password);
        res.send('respond with a resource');
    },
    /* Login controller for all users */

    /* Signup controller for customers */
    signUp: async (req, res) => {
        await userService.signUp(req, res);
        res.send('respond with a resource');
    }
    /* Signup controller for customers */
}

module.exports = userController;