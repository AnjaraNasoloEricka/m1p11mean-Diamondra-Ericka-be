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
                    "format": "date"
                }
            }
        }
    }
};