export default function commingDateToStr(commingDate) {
    if (!commingDate) {
        return "Comming";
    }
    const date = new Date(commingDate);
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
    let currMonth = date.getMonth() + 1;
    let bgMonth = "";
    switch (currMonth) {
        case 1: bgMonth = "Ян."; break;
        case 2: bgMonth = "Фев."; break;
        case 3: bgMonth = "Март"; break;
        case 4: bgMonth = "Апр."; break;
        case 5: bgMonth = "Май"; break;
        case 6: bgMonth = "Юни"; break;
        case 7: bgMonth = "Юли"; break;
        case 8: bgMonth = "Авг."; break;
        case 9: bgMonth = "Сеп."; break;
        case 10: bgMonth = "Окт."; break;
        case 11: bgMonth = "Ное."; break;
        case 12: bgMonth = "Дек."; break;

        default: bgMonth = ""; break;
    }
    return "За " + day + " " + bgMonth + "-" +date.getHours();
}