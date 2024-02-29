module.exports = {
    getSchemaPayement() {
        return {
            "type": "object",
            "required": ["date", "amount"],
            "properties": {
                "date": {
                    "type": "string",
                    "format": "date"
                },
                "amount": {
                    "type": "number",
                    "minimum": 0
                }
            }
        }
    }
};