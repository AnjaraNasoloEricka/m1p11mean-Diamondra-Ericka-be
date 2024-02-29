const hourUtilities = {
    getSecondTotal(stringTime) {
        const timeArray = stringTime.split(':');
        const hours = parseInt(timeArray[0]);
        const minutes = parseInt(timeArray[1]);
        return (hours * 3600) + (minutes * 60);
    }
};

module.exports = hourUtilities;