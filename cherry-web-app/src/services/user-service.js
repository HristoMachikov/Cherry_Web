const userService = {
    register: function (body) {
        return fetch(`http://localhost:4000/user/register}`, {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((res) => {
            console.log(document.cookie);
            console.log(res);
    
            return res.json()
        }).catch((myErr) => console.error("catchServ"+myErr));
    },
    login: function (body, isLoginPage) {
        return fetch(`http://localhost:4000/user/login`, {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            console.log(document.cookie);
            console.log(res);

            return res.json()
        }).catch((myErr) => console.error("catchServ"+myErr));
    },
    getLogout: function () {
        return fetch('http://localhost:4000/user/logout',{
            credentials: 'include'
        }).then((res) => {
            console.log(document.cookie);
            return res.json()
        }).catch((myErr) => console.error("catchServ"+myErr));
    }
};

export default userService;

// post: function (body, isLoginPage) {
//     return fetch(`http://localhost:4000/user/${isLoginPage ? "login" : "register"}`, {
//         method: "post",
//         headers: {
//             'Accept': 'application/json, text/plain',
//             'Content-Type': 'application/json'
//         },
//         credentials: 'include',
//         body: JSON.stringify(body)
//     }).then((res) => {
//         console.log(document.cookie);
//         console.log(res);

//         return res.json()
//     }).catch((myErr) => console.error("catchServ"+myErr));
// },