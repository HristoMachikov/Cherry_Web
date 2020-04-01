import { hostName } from '../config/app-config';

const userService = {
    register: function (body) {
        return fetch(`${hostName}/user/register`, {
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
        return fetch(`${hostName}/user/login`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            return res.status === 200 ? res.json() : res.text();
            // .then(text => Promise.reject(text));
            // .then(res => res.text().then(text => res.status === 200 ? text : Promise.reject(text)));
        }).catch((err) => console.error(err));
    },
    logout: function () {
        return fetch(`${hostName}/user/logout`, {
            credentials: 'include'
        }).then((res) => {
            return res.text()
        }).catch((err) => console.error(err));
    },
    sendEmail: function (body) {
        return fetch(`${hostName}/user/send-email`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            return res.status === 200 ? res.json() : res.text();
            // .then(text => Promise.reject(text));
            // .then(res => res.text().then(text => res.status === 200 ? text : Promise.reject(text)));
        }).catch((err) => console.error(err));
    },
    setNewPassword: function (body, userId) {
        return fetch(`${hostName}/user/new-password`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            return res.status === 200 ? res.json() : res.text();
            // .then(text => Promise.reject(text));
            // .then(res => res.text().then(text => res.status === 200 ? text : Promise.reject(text)));
        }).catch((err) => console.error(err));
    },
    getConfirmNewPassword: function (linkId) {
        return fetch(`${hostName}/user/new-password/${linkId}`, {
            credentials: 'include'
        }).then((res) => {
            return res.status === 200 ? res.json() : res.text();
        }).catch((err) => console.error(err));
    },
    changePassword: function (body, userId) {
        return fetch(`${hostName}/user/change-password${`?userId=${userId}`}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            return res.status === 200 ? res.json() : res.text();
        }).catch((err) => console.error(err));
    }

};

export default userService;