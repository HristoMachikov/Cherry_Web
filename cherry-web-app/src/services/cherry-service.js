const cherryService = {
    getProducts: function () {
        return fetch(`http://localhost:4000`, {
            credentials: 'include'
        }).then((res) => {
            // return fetch(`http://localhost:9999/api/origami${id ? `/${id}` : ""}${limit ? `?limit=${limit}` : ""}`).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    getProductsAdmin: function () {
        return fetch(`http://localhost:4000/cherry/all`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    getRemove: function (id) {
        return fetch(`http://localhost:4000/cherry/remove/${id}`, {
            credentials: 'include'
        }
        ).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    getEdit: function (id) {
        return fetch(`http://localhost:4000/cherry/edit/${id}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
    postEdit: function (id, body) {

        return fetch(`http://localhost:4000/cherry/edit/${id}`, {
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
    postCreate: function (body) {

        return fetch(`http://localhost:4000/cherry/create`, {
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
        return fetch(`http://localhost:4000/cherry/gallery/${id}`, {
            credentials: 'include',
        }
        ).then((res) => {
            return res.json()
        }).catch((notConectionErr) => console.error(notConectionErr));
    },
};

export default cherryService;