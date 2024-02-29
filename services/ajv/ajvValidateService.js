module.exports = {
    getSchemaService(){
        return {
            "type": "object",
            "required": ["name", "serviceType", "price", "description", "duration", "commissionRate"],
            "properties": {
                "name": {
                    "type": "string"
                },
                "serviceType": {
                    "type": "string"
                },
                "price": {
                    "type": "number",
                    "minimum": 0
                },
                "description": {
                    "type": "string"
                },
                "duration": {
                    "type": ["number", "string"],
                    "pattern": "^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"
                    
                },
                "commissionRate": {
                    "type": "number",
                    "minimum": 0
                }

            }
        }
    }
}