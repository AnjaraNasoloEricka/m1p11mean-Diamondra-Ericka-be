const Ajv = require('ajv');
const responseHandler  = require('../handler/responseHandler');

function validateSchema(schema, data){
    const ajv = new Ajv();
    const valid = ajv.compile(schema);

    if (!valid(data)) {
        const errors = valid.errors.map(error => {
            let errorMessage = '';
            switch (error.keyword) {
                case 'enum':
                    errorMessage = `${error.instancePath.slice(1)} is invalid`;
                    break;
                case 'type':
                    if (error.params.type === 'undefined') {
                        errorMessage = `${error.instancePath.slice(1)} is required`;
                    }
                    break;
                case 'required':
                    errorMessage = `${error.instancePath.slice(1)} is required`;
                    break;
                case 'format':
                    errorMessage = `${error.instancePath.slice(1)} is invalid`;
                    break;
                case 'pattern':
                    errorMessage = `${error.instancePath.slice(1)} is invalid`;
                    break;
                case 'minLength':
                    errorMessage = `${error.instancePath.slice(1)} is too short`;
                    break;
                case 'maxLength':
                    errorMessage = `${error.instancePath.slice(1)} is too long`;
                    break;
                case 'minimum':
                    errorMessage = `${error.instancePath.slice(1)} is too small`;
                    break;
                case 'maximum':
                    errorMessage = `${error.instancePath.slice(1)} is too large`;
                    break;
            }
            return errorMessage;
        });
        
        const errorMessage = errors.join(',');


        const errorException = new responseHandler(400, errorMessage)

        if(errorMessage.length > 0) throw errorException;
    } 
}

module.exports = {
    validateSchema,
};
