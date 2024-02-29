module.exports = (socket) => {
    return {
        sendNotification: function(specialOffer) {
            const { startDate, endDate, reductionType, reductionValue } = specialOffer;
            let title = "Special Offer";
            let body = "";

            if (reductionType === "percentage") {
                body = `Get ${reductionValue}% off on selected items`;
            } else if (reductionType === "value") {
                body = `Price will be reduced by ${reductionValue}`;
            }

            const formattedStartDate = new Date(startDate).toLocaleDateString();
            const formattedEndDate = new Date(endDate).toLocaleDateString();
            body += ` from ${formattedStartDate} to ${formattedEndDate}`;

            socket.emit('notification', { title, body });
        }
    };
}
            





