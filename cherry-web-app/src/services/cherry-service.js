const cherryService = {
    load: function () {
        return fetch(`http://localhost:4000`).then((res) => {
            // return fetch(`http://localhost:9999/api/origami${id ? `/${id}` : ""}${limit ? `?limit=${limit}` : ""}`).then((res) => {
            console.log(res);

            return res.json()
        }).catch((myErr) => console.error(myErr));
    },
    getEdit: function (id) {
        return fetch(`http://localhost:4000/cherry/edit/${id}`
        ).then((res) => {
            return res.json()
        }).catch((myErr) => console.error(myErr));
    },
    postEdit: function (id, body) {

        return fetch(`http://localhost:4000/cherry/edit/${id}`,
            {
                method: "POST",
                body: JSON.stringify(body)
                // headers: {
                //     'Content-Type': 'application/json'
                // }
            }).then((res) => {
                return res.json()
            }).catch((myErr) => console.error(myErr));
    }
};

export default cherryService;