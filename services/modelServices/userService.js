const ajvServices = require('../ajv/ajvServices');
const ajvValidateUser = require('../ajv/ajvValidateUser');
const responseHandler = require('../handler/responseHandler');
const { User } = require('../../models/User');
const { Role } = require('../../models/Role');
const bcrypt = require('bcrypt');
const utilities = require('../utilities');

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

            if(user.status === 0) throw new responseHandler(401, 'Your account is not confirmed yet. Please check your email and confirm your account.');

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
    signUp: async function(userData) {
        try{
            const schema = ajvValidateUser.getSchemaSignUp();
            ajvServices.validateSchema(schema, userData);

            let user = await User.findOne({ email : userData.email });
            if (user)
                throw new responseHandler(401, 'This email is already registered',
                    { "email" : userData.email }
                );

            user = new User(userData);

            let role = await Role.findOne({ label : "Customer" });

            if (!role)
                throw new responseHandler(500, 'The role does not exist');

            user.role = role._id;

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            user.password = await bcrypt.hash(user.password, salt);
            let newUser = await user.save();

            //send email
            await utilities.sendConfirmationEmail(newUser);
            
            return new responseHandler(200, "User created successfully. Please check your email and confirm your account.", 
                {
                    "user" : {
                        "name" : newUser.name,
                        "email" : newUser.email,
                        "role" : newUser.role,
                    }
                });

        }
        catch(error){
            throw error;
        }      
    },
    confirm: async function(token) {
        try{
            let user = await User.findOne({ confirmationLink : token });
            if (!user)
                throw new responseHandler(401, 'The user does not exist');
            if (user.status === 1)
                throw new responseHandler(401, 'The user is already confirmed');
            
            user.status = 1;
            user.confirmationLink = "";
            await user.save();
            return new responseHandler(200, "The user is confirmed", user.toJSON());
        }
        catch(error){
            throw error;
        }
    }
};

module.exports = userService;
