module.exports = {
    getChangePassword() {
        return {
            "type": "object",
            "required": ["currentPassword", "newPassword", "confirmPassword"],
            "properties": {
                "currentPassword": {
                    "type": "string",
                },
                "newPassword": {
                    "type": "string",
                    "pattern": '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&!])[A-Za-z\\d@#$%^&!]+$',
                    "minLength": 8,
                    "maxLength": 20
                },
                "confirmPassword": {
                    "type": "string",
                    "pattern": '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@#$%^&!])[A-Za-z\\d@#$%^&!]+$',
                    "minLength": 8,
                    "maxLength": 20
                }
            }
        }
    },
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
            "required": ["pseudo", "email", "nom", "genre", "dateNaissance", "adresse", "ville", "motDePasse", "confirmationMotDePasse", "isPro", "nomPays"],
            "properties": {
                "pseudo": {
                    "type": "string"
                },
                "email": {
                    "type": "string",
                    "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"

                },
                "nom": {
                    "type": "string"
                },
                "genre": {
                    "type": "string",
                    "maxLength": 10
                },
                "dateNaissance": {
                    "type": "string",
                    "pattern": "^(\\d{4}-\\d{2}-\\d{2})$"
                },
                "adresse": {
                    "type": "string"
                },
                "ville": {
                    "type": "string"
                },
                "motDePasse": {
                    "type": "string",
                    "pattern": "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
                },
                "confirmationMotDePasse": {
                    "type": "string"
                },

                "isPro": {

                }
                ,
                "nomPays": {
                    "type": "string",
                    "minLength": 1
                }

            }
        };
    },
    getSchemaResend() {
        return {
            "type": "object",
            "required": ["email", "pseudo"],
            "properties": {
                "email": {
                    "type": "string",
                    "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
                },
                "pseudo": {
                    "type": "string",
                    "minLength": 1
                }
            }
        }
    },
    getSchemaFeedbacks(){
        return {
            "type": "object",
            "required": ["proId", "commentaire","note"],
            "properties": {
                "proId": {
                    "type": "integer"
                },
                "commentaire": {
                    "type": "string",
                    "minLength": 1
                },
                "note":{
                    "type": "string"
                }
            }
        }
    }
};
