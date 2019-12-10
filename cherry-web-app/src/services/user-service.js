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
            return res.status === 200 ? res.json() : res.text();
        }).catch((err) => console.error(err));
    },
    login: function (body) {
        return fetch(`http://localhost:4000/user/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            return res.status === 200 ? res.json() : res.text()
            // .then(text => Promise.reject(text));
            // .then(res => res.text().then(text => res.status === 200 ? text : Promise.reject(text)));
        }).catch((err) => console.error(err));
    },
    logout: function () {
        return fetch('http://localhost:4000/user/logout', {
            credentials: 'include'
        }).then((res) => {
            return res.text()
        }).catch((err) => console.error(err));
    }
};

export default userService;