const cherryService = {
    load: function () {
        return fetch(`http://localhost:4000`).then((res) => {
            // return fetch(`http://localhost:9999/api/origami${id ? `/${id}` : ""}${limit ? `?limit=${limit}` : ""}`).then((res) => {
            return res.json()
        }).catch((myErr) => console.error(myErr));
    },
    getEdit: function (id) {
        console.log(id)
        return fetch({
            url: `http://localhost:4000/cherry/edit/${id}`,
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then((res) => {
            // return fetch(`http://localhost:9999/api/origami${id ? `/${id}` : ""}${limit ? `?limit=${limit}` : ""}`).then((res) => {
            console.log(res);
            return res.json()
        }).catch((myErr) => console.error(myErr));
    },

};

export default cherryService;