import { hostName } from '../config/app-config';

const orderService = {
    getNewProduct: function (id) {
        return fetch(`${hostName}/order/new-product${id ? `/${id}` : ""}`, {
            // return fetch(`http://localhost:9999/api/origami${id ? `/${id}` : ""}${limit ? `?limit=${limit}` : ""}`).then((res) => {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    },
    postOrder: function (body) {
        return fetch(`${hostName}/order/create`, {
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
    getUserOrders: function (id) {
        return fetch(`${hostName}/user/my-orders/${id}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    },
    getAdminOrders: function (status, startDate, endDate) {
        return fetch(`${hostName}/admin/orders${`?status=${status}`}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    },
    getApproveOrder: function (id, status, commingDate) {
        return fetch(`${hostName}/admin/approve-order/${id}${`?status=${status}`}${commingDate ? `&commingDate=${commingDate}` : ""}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    },
    getRemoveOrder: function (id) {
        return fetch(`${hostName}/admin/remove-order/${id}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    },
    getEditAddress: function (orderId, userAddress) {
        return fetch(`${hostName}/admin/edit-address/${orderId}${`?address=${userAddress}`}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    },
    getArchiveOrder: function (orderId) {
        return fetch(`${hostName}/user/archive-order/${orderId}`, {
            credentials: 'include'
        }).then((res) => {
            return res.json()
        }).catch((err) => console.error(err));
    }
};
export default orderService;