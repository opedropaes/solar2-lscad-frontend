const formatDate = (day, month, year) => {

    day = (day > 10) ? JSON.stringify(day) : ('0' + day).slice(-2);
    month = (month > 10) ? JSON.stringify(month) : ('0' + month).slice(-2);
    year = (typeof year != "string") ? JSON.stringify(year) : year;

    return year + month + day;

}

export default formatDate;