const userService = {
    post: function (body, isLoginPage) {
        return fetch(`http://localhost:4000/user/${isLoginPage ? "login" : "register"}`, {
            method: "post",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((res) => {
            return res.json()
        }).catch((myErr) => console.error(myErr));
    },
    getLogout: function () {
        return fetch('http://localhost:4000/user/logout').then((res) => {
            return res.json()
        }).catch((myErr) => console.error(myErr));
    }
};

export default userService;