const ajvServices = require('../ajv/ajvServices');
const ajvValidateUser = require('../ajv/ajvValidateUser');
const ResponseHandler = require('../handler/responseHandler');


const userService = {
    login: async function(email, password) {
        const data = { email : email, password : password };
        try{
            const schema = ajvValidateUser.getSchemaLogin();
            ajvServices.validateSchema(schema, data);
        }
        catch(error){
            console.log("error", error);
        }      
    }
};

module.exports = userService;

