import React, { Component, Fragment } from 'react';

import UserSingle from './UserSingle/UserSingle';

import orderService from '../../services/order-service';

import dateToString from '../../shared/methods/date-to-string';

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
                const isLoading = false;
                let orders = addDateToString(ordersResult);
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
                                            key={order._id}
                                            id={order._id}
                                            index={index + 1}
                                            status={order.status}
                                            date={order.dateToStr}
                                            total={order.total}
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