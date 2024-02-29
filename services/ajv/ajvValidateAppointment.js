module.exports = {
    getSchemaAppointment() {
        return {
            "type": "object",
            "required": ["employeeId", "customerId", "startDateTime"],
            "properties": {
                "employeeId": {
                    "type": "string"
                },
                "customerId": {
                    "type": "string"
                },
                "startDateTime": {
                    "type": "string",
                    // "format": "date"
                    "pattern": "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$",
                }
            }
        }
    }
};