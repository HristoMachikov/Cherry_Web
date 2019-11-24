const userService = {
    post: function (body, isLoginPage) {
        return fetch(`http://localhost:4000/user/${isLoginPage ? "login" : "register"}`, {
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
        return fetch('http://localhost:4000/user/logout').then((res) => {
            console.log(document.cookie);
            return res.json()
        }).catch((myErr) => console.error("catchServ"+myErr));
    }
};

export default userService;