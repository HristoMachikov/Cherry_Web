import React, { Component, Fragment } from 'react';

import AdminSingle from './AdminSingle/AdminSingle';

import orderService from '../../services/order-service';

import dateToString from '../../shared/methods/date-to-string';

const addDateToString = (orders) => {
    let ordersArr = orders.map(order => {
        order.dateToStr = dateToString(order.date)
        return order;
    });
    return ordersArr;
}

class AdminOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            orders: [],
            status: 'Pending',
            startDate: '',
            endDate: ''
        }
    }

    handleFormElementChange = (event) => {
        // const { name, value, id } = event.target;
        let status = event.target.value;
        // const { products } = this.state;
        // let subTotal = 0;
        // const { price } = products[id];

        // if (name === "weigth") { subTotal = products[id].quantity * value * price };
        // if (name === "quantity") { subTotal = products[id].weigth * value * price };
        // if (Number(subTotal) < 0) subTotal = 0;

        // const prevTotal = Object.keys(products)
        //     .filter(key => key !== id)
        //     .reduce((acc, key) => {
        //         return acc + products[key].subTotal;
        //     }, 0);

        // const total = prevTotal + subTotal;

        // products[id][name] = value;
        // products[id].subTotal = subTotal;
        this.setState({ status });
        console.log(status);
    }

    componentDidMount() {
        // const userId = this.props.userId || localStorage.getItem('userId');
        orderService.getPendingOrders(this.state.status).then(pendingOrders => {
            if (pendingOrders) {

                const isLoading = false;
                let orders = addDateToString(pendingOrders);
                this.setState({ orders, isLoading })
            }
        }).catch(err => console.log(err))
    }

    componentDidUpdate() {
        orderService.getPendingOrders(this.state.status).then(pendingOrders => {
            if (pendingOrders) {

                const isLoading = false;
                let orders = addDateToString(pendingOrders);
                this.setState({ orders, isLoading })
            }
        }).catch(err => console.log(err))
        console.log(this.state.status);
    }

    render() {
        const { orders, isLoading, status } = this.state;
        return (
            <section className="site-section home">
                <article className="schedule" id="schedule">
                    {isLoading ?
                        <header>
                            <h2>Loading...</h2>
                        </header>
                        : <Fragment>
                            <header>
                                <h2>Чакащи поръчки</h2><span></span>
                            </header>
                            <span>
                                <select name="status" value={status} onChange={this.handleFormElementChange} placeholder="Изберете">
                                    <option value="">-</option>
                                    <option value="Pending">Чакащи</option>
                                    <option value="Approve">Одобрени</option>
                                    <option value="Comming">За дата</option>
                                    <option value="Done">Доставени</option>
                                    {/* <option value="archive">Архиви</option> */}
                                </select>
                            </span>
                            {orders.length ? <table className="main-table">
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Дата</th>
                                        <th>Общо</th>
                                        <th>Статус</th>
                                        <th>Детайли</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => {
                                        return <AdminSingle
                                            key={order._id}
                                            id={order._id}
                                            index={index + 1}
                                            status={order.status}
                                            date={order.dateToStr}
                                            total={order.total}
                                            products={order.productsJson}
                                        >
                                        </AdminSingle>;
                                    })}
                                </tbody>
                            </table>
                                : <header>
                                    <h4>В момента няма чакащи поръчки!</h4>
                                </header>
                            }
                        </Fragment>
                    }
                </article>
            </section>
        );
    }
}

export default AdminOrders;