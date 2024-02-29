module.exports = {
    getSchemaExpense() {
        return {
            "type": "object",
            "required": ["date", "amount", "expenseType"],
            "properties": {
                "date": {
                    "type": "string",
                    "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$",
                },
                "amount" : {
                    "type": "number"
                },
                "expenseType": {
                    "type": "object",
                    "required": ["_id", "label"],
                    "properties": {
                        "_id": {
                            "type": "string"
                        },
                        "label": {
                            "type": "string"
                        }
                    }
                }
            }
        }
    }
}