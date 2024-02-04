const userService = require('../services/modelServices/userService');

const userController = {
    /* Login controller for all users */
     login: async (req, res) => {
        const { email, password } = req.body;
        
        try{
            const responseLogin =  await userService.login(email, password);

            return res.status(responseLogin.status).json(responseLogin);
        }
        catch(err){
            console.log(err);
            return res.status(err.status).json(err);
        }
        

    },

    /* Login controller for all users */

    /* Signup controller for customers */
    signUp: async (req, res) => {
        try {
            const response = await userService.signUp(req.body);

            res.status(response.status).json(response);
        }
        catch(err){
            console.log(err);
            return res.status(err.status).json(err);
        }
    },
    /* Signup controller for customers */

    /* Signup confirmation controller for customers */
    confirm: async (req, res) => {
        try {
            const response = await userService.confirm(req.params.token);
            res.status(response.status).json(response);
        }
        catch(err){
            console.log(err);
            return res.status(err.status).json(err);
        }
    }
    /* Signup confirmation controller for customers */
}

module.exports = userController;