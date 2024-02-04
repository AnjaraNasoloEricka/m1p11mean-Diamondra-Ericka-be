const ajvServices = require('../ajv/ajvServices');
const ajvValidateUser = require('../ajv/ajvValidateUser');
const responseHandler = require('../handler/responseHandler');
const { User } = require('../../models/User');
const bcrypt = require('bcrypt');


const userService = {
    login: async function(email, password) {
        const data = { email : email, password : password };
        try{
            const schema = ajvValidateUser.getSchemaLogin();
            ajvServices.validateSchema(schema, data);
            let user = await User.findOne({ email : email });
            if (!user)
                throw new responseHandler(401, 'The user does not exist');

            const validPassword = await bcrypt.compare(
                password,
                user.password
            );

            if (!validPassword)
                throw new responseHandler(401, 'The password is incorrect');
    
            const token = user.generateAuthToken();

            return new responseHandler(200, "The email and password are valid",
                {
                    "token" : token,
                    "user" : {
                        "name" : user.name,
                        "email" : user.email,
                        "role" : user.role,
                    }
                }
            );        
        }
        catch(error){
            throw error;
        }      
    },
    signUp: async function(req, res) {
        try{
            let userData = req.body;
            const schema = ajvValidateUser.getSchemaSignUp();
            ajvServices.validateSchema(schema, userData);

            const user = new User(userData);

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            user.password = await bcrypt.hash(user.password, salt);
            console.log(user.password);
            return new ResponseHandler(res, 200, "User created successfully", user.toJSON());
            //await user.save();
        }
        catch(error){
            console.log("error", error);
            return new ResponseHandler(res, 400, error.message);
        }      
    }
};

module.exports = userService;
