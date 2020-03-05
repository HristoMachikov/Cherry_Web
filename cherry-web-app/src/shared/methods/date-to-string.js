export default function dateToString(dateStr) {
    const date = new Date(dateStr);
    let currDay = date.getDate();
    let day = currDay < 10 ? "0" + currDay : currDay;
    let currMonth = date.getMonth() + 1;
    let month = currMonth < 10 ? "0" + currMonth : currMonth;
    let currHours = date.getHours();
    let hours = currHours < 10 ? "0" + currHours : currHours;
    let currMinutes = date.getMinutes();
    let minutes = currMinutes < 10 ? "0" + currMinutes : currMinutes;
    let currSeconds = date.getSeconds();
    let seconds = currSeconds < 10 ? "0" + currSeconds : currSeconds;
    // return day + "." + month + "." + date.getFullYear() + ' - ' + date.toLocaleTimeString();
    return day + "." + month + "." + date.getFullYear() + ' - ' + hours + ":" + minutes + ":" + seconds;
}