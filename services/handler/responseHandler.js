class ResponseHandler {
    constructor(res, status = 200, message = '', data = undefined) {
        this.error = (res, status, message) => {
            let response = {
                status: status,
                message: message
            };
            
            if (data !== undefined) {
                response.data = data;
            }
            
            return res.status(status).json(response);
        };
    }
}


module.exports = ResponseHandler;