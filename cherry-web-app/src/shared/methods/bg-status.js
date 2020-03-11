export default function (status) {
    switch (status) {
        case "Pending": return "Чакащи";
        case "Approve": return "Одобрени";
        case "Comming": return "Идващи";
        case "Done": return "Доставени";
        case "Archive": return "Архивни";
        default: return "Всички"
    }
};