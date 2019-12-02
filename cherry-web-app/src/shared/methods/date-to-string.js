export default function dateToString(dateStr) {
    const date = new Date(dateStr);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    let currMonth = date.getMonth() + 1;
    let month = currMonth < 10 ? "0" + currMonth : currMonth
    return day + "." + month + "." + date.getFullYear() + ' - ' + date.toLocaleTimeString();
}