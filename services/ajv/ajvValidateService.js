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
                    "type": "number",
                    "minimum": 0
                },
                "commissionRate": {
                    "type": "number",
                    "minimum": 0
                }

            }
        }
    }
}