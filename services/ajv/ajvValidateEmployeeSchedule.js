const { dayEnum } = require("../../data/enum")

module.exports = {
    getSchemaEmployeeSchedule() {
        return {
            "type": "object",
            "required": ["startDate", "endDate", "day", "startHour", "endHour"],
            "properties": {
                "startDate": {
                    "type": "string",
                    "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
                 },
                
                "endDate": {
                    "type": "string",
                    "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}$"
                },
                "day" : {
                    "type" : "array",
                    "items" : {
                        "type" : "string",
                        "enum" : dayEnum
                    }
                },
                "startHour": {
                    "type" : "number",
                    "minimum" : 1
                },
                "endHour": {
                    "type" : "number",
                    "minimum" : 1
                }
            }
        }
    }
}