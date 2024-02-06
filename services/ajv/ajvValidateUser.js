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
                    "type": "string",
                    "minLength": 6
                }
            }
        }
    },
    getSchemaSignUp() {
        return {
            "type": "object",
            "required": ["email", "name", "password", "phoneNumber"],
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
                },
                "phoneNumber": {
                    "type": "string",
                },
            }
        };
    },
};
