module.exports = {
    handleErrors: (err, res, cubeBody) => {
        let errorsArr = [];
        for (const prop in err.errors) {
            errorsArr.push(err.errors[prop].message);
        }
        res.locals.globalErrors = errorsArr;
    },
    handleError: (err, res) => {
        res.locals.globalError = err;
    },
    options: (elem) => {
        return [
            { value: 0, title: '0 kg', selected: 0 === elem.weigth },
            { value: 6, title: '6 kg', selected: 6 === elem.weigth },
            { value: 8, title: '8 kg', selected: 8 === elem.weigth },
            { value: 10, title: '10 kg', selected: 10 === elem.weigth },
            { value: 12, title: '12 kg', selected: 12 === elem.weigth }
        ]
    },
    dateToString: (date) => {
        let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
        let month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth()
        return day + "." + month + "." + date.getFullYear() + 'г., ' + date.toLocaleTimeString() + 'ч.';
    }
};