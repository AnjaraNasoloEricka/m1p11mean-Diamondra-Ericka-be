module.exports = {
    getSchemaSpecialOffer() {
        return {
            "type": "object",
            "required": ["startDate", "endDate", "services", "reductionType", "reductionValue", "commissionRate", "commissionValue"],
            "properties": {
                "startDate": {
                    "type": "string",
                    "format": "date"
                },
                "endDate": {
                    "type": "string",
                    "format": "date"
                },
                "services": {
                    "type": "array",
                    "items": {
                        "type": "string",
                    }
                },
                "reductionType": {
                    "type": "string",
                    "enum": ["percentage", "value"]
                },
                "reductionValue": {
                    "type": "number",
                    "minimum": 0
                },
                "commissionRate": {
                    "type": "number",
                    "minimum": 0
                },
                "commissionValue": {
                    "type": "number",
                    "minimum": 0
                }
            }
        }
    }
};