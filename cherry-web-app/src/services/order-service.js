const orderService = {
    getNewProduct: function (id) {
        return fetch(`http://localhost:4000/order/new-product${id ? `/${id}` : ""}`, {
            // return fetch(`http://localhost:9999/api/origami${id ? `/${id}` : ""}${limit ? `?limit=${limit}` : ""}`).then((res) => {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    },
    postOrder: function (body) {

        return fetch(`http://localhost:4000/order/create`, {
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
    }
};
export default orderService;