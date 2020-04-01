import { hostName } from '../config/app-config';

const cherryService = {
    getProducts: function () {
        return fetch(`${hostName}/home`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    getProductsAdmin: function () {
        return fetch(`${hostName}/cherry/all`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    getRemove: function (id) {
        return fetch(`${hostName}/cherry/remove/${id}`, {
            credentials: 'include'
        }
        ).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    getEdit: function (id) {
        return fetch(`${hostName}/cherry/edit/${id}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    postEdit: function (id, body) {

        return fetch(`${hostName}/cherry/edit/${id}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            return res.text()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    postCreate: function (body) {

        return fetch(`${hostName}/cherry/create`, {
            method: "POST",
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body)
        }).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    getGallery: function (id) {
        return fetch(`${hostName}/cherry/gallery/${id}`, {
            credentials: 'include',
        }
        ).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
};

export default cherryService;