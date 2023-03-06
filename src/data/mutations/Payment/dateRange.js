export default  function dateRange(startDate, endDate, steps = 1) {
    const dateArray = [];
    let currentDate = new Date(startDate);
    
    while (currentDate < new Date(endDate)) {
        let dateFormat = new Date(currentDate)
        dateArray.push(dateFormat.toISOString().split('T')[0]);
        currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }
    
    return dateArray;
}