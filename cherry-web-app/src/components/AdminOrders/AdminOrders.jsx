import React,{ Component, Fragment } from 'react';
// import { Link } from 'react-router-dom';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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
            orders: []
        }
    }

    componentDidMount() {
        // const userId = this.props.userId || localStorage.getItem('userId');
        orderService.getPendingOrders().then(pendingOrders => {
            console.log(pendingOrders)
            if (pendingOrders) {
                // console.log(pendingOrders)
                const isLoading = false;
                let orders = addDateToString(pendingOrders);
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
                                <h2>Чакащи поръчки</h2><span></span>
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
                                        return <AdminSingle
                                          
                                            key={order._id}
                                            id={order._id}
                                            index={index + 1}
                                            status={order.status}
                                            date={order.dateToStr}
                                            total={order.total}
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