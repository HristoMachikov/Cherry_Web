import React, { Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import UserSingle from './UserSingle/UserSingle';

import orderService from '../../services/order-service';

import dateToString from '../../shared/methods/date-to-string';

// const dateToString = (dateStr) => {
//     const date = new Date(dateStr);
//     let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
//     let currMonth = date.getMonth() + 1;
//     let month = currMonth < 10 ? "0" + currMonth : currMonth
//     return day + "." + month + "." + date.getFullYear() + ' - ' + date.toLocaleTimeString();
// }

const addDateToString = (orders) => {
    let ordersArr = orders.map(order => {
        order.dateToStr = dateToString(order.date)
        return order;
    });
    return ordersArr;
}

class UserOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            orders: []
        }
    }

    componentDidMount() {
        const userId = this.props.userId || localStorage.getItem('userId');
        orderService.getUserOrders(userId).then(ordersResult => {
            if (ordersResult) {
                console.log(ordersResult)
                const isLoading = false;
                let orders = addDateToString(ordersResult);
                console.log(orders)
                this.setState({ orders, isLoading })
            }
        }).catch(err => console.log(err))
    }

    render() {
        const { orders, isLoading } = this.state;
        return (
            <section className="site-section home">
                <article className="schedule" id="schedule">
                    {isLoading ?
                        <header>
                            <h2>Loading...</h2>
                        </header>
                        : <Fragment>
                            <header>
                                <h2>Моите поръчки</h2><span></span>
                            </header>
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
                                        return <UserSingle
                                            // history={this.props.history}
                                            key={order._id}
                                            id={order._id}
                                            index={index + 1}
                                            status={order.status}
                                            date={order.dateToStr}
                                            total={order.total}
                                        // handleFormElementChange={this.handleFormElementChange}
                                        // handleClickDelete={this.handleClickDelete}
                                        >
                                        </UserSingle>;
                                    })}
                                </tbody>
                            </table>
                                : <header>
                                    <h4>В момента няма направени поръчки!</h4>
                                </header>
                            }
                        </Fragment>
                    }
                </article>
            </section>
        );
    }

}

export default UserOrders;