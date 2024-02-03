module.exports = {
    getSchemaLogin() {
        return {
            "type": "object",
            "required": ["email", "password"],
            "properties": {
                "email": {
                    "type": "string",
                    "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
                },
                "password": {
                    "type": "string"
                }
            }
        }
    },
    getSchemaSignUp() {
        return {
            "type": "object",
            "required": ["email", "name", "password", "passwordConfirmation"],
            "properties": {
                "email": {
                    "type": "string",
                    "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"

                },
                "name": {
                    "type": "string"
                },
                "password": {
                    "type": "string",
                    //"pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
                },
                "passwordConfirmation": {
                    "type": "string"
                },
            }
        };
    },
};
