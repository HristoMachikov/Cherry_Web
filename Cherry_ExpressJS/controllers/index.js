
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
    //  difficultyLevels:
    //     [
    //         { level: 1, levelName: "Very Easy" },
    //         { level: 2, levelName: "Easy" },
    //         { level: 3, levelName: "Medium (Standard 3x3)" },
    //         { level: 4, levelName: "Intermediate" },
    //         { level: 5, levelName: "Expert" },
    //         { level: 6, levelName: "Hardcore" }
    //     ],
    options: (elem) => {
        return [
            { value: 0, title: '0 kg', selected: 0 === elem.weigth },
            { value: 6, title: '6 kg', selected: 6 === elem.weigth },
            { value: 8, title: '8 kg', selected: 8 === elem.weigth },
            { value: 10, title: '10 kg', selected: 10 === elem.weigth },
            { value: 12, title: '12 kg', selected: 12 === elem.weigth }
        ]
    }
};
