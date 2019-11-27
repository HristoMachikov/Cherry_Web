const userService = {
    register: function (body) {
        return fetch(`http://localhost:4000/user/register`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    },
    login: function (body, isLoginPage) {
        return fetch(`http://localhost:4000/user/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    },
    getLogout: function () {
        return fetch('http://localhost:4000/user/logout', {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    }
};

export default userService;