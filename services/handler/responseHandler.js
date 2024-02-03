class responseHandler {
    
    constructor(status = 200, message = '', data = undefined) {
        this.status = status;
        this.message = message;
        (data !== undefined) ? this.data = data : '';
    }
}

module.exports = responseHandler;