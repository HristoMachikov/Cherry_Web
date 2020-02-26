import React, { Component, Fragment } from 'react';

import AdminSingle from './AdminSingle/AdminSingle';

import Picker from '../Home/Calendar/Picker/Picker';
import * as FromPicker from '../Home/Calendar/Picker/Picker';

import orderService from '../../services/order-service';

import dateToString from '../../shared/methods/date-to-string';

const addDateToString = (orders) => {
    let ordersArr = orders.map(order => {
        order.dateToStr = dateToString(order.date)
        return order;
    });
    return ordersArr;
}

// class AdminOrders extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: true,
//             orders: [],
//             status: 'Pending',
//             // startDate: '',
//             // endDate: ''
//         }
//     }


const SHOW_TIME = true;
// class Demo extends React.Component {
//     state = {
//         startDate: null,
//         endDate: null,
//     };

//     onChange = (field, value) => {
//         console.log('onChange', field, value && value.format(FromPicker.getFormat(SHOW_TIME)));

//         this.setState({
//             [field]: value,
//         });

//     }

//     disabledEndDate = (endDate) => {
//         if (!endDate) {
//             return false;
//         }
//         const startDate = this.state.startDate;
//         if (!startDate) {
//             return false;
//         }
//         return SHOW_TIME ? endDate.isBefore(startDate) :
//             endDate.diff(startDate, 'days') <= 0;
//     }

//     disabledStartDate = (startDate) => {
//         if (!startDate) {
//             return false;
//         }
//         const endDate = this.state.endDate;
//         if (!endDate) {
//             return false;
//         }
//         return SHOW_TIME ? endDate.isBefore(startDate) :
//             endDate.diff(startDate, 'days') <= 0;
//     }

//     render() {
//         const state = this.state;
//         console.log(this.state.startDate && this.state.startDate.toDate())
//         console.log(this.state.endDate && this.state.endDate.toDate())
//         return (
//             <div
//                 style={{ width: 1024, margin: 20 }}
//             >
//                 <span>
//                     <span>От дата:</span>
//                     <Picker
//                         disabledDate={this.disabledStartDate}
//                         value={state.startDate}
//                         onChange={this.onChange.bind(this, 'startDate')}
//                     />
//                 </span>

//                 <span>
//                     <span>До дата:</span>
//                     <Picker
//                         disabledDate={this.disabledEndDate}
//                         value={state.endDate}
//                         onChange={this.onChange.bind(this, 'endDate')}
//                     />
//                 </span>
//             </div>);
//     }
// }

// export default Demo;

const AdminOrders = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [orders, setOrders] = React.useState([]);
    const [status, setStatus] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const handleFormElementChange = React.useCallback((event) => {
        let status = event.target.value;
        setStatus(status);
        console.log(status);
    }, [status, setStatus]);

    React.useEffect(() => {
        orderService.getPendingOrders(status, startDate, endDate).then(pendingOrders => {
            if (pendingOrders) {

                // const isLoading = false;
                setIsLoading(false);
                let orders = addDateToString(pendingOrders);
                setOrders(orders);
                // this.setState({ orders, isLoading })
            }
        }).catch(err => console.log(err))
        console.log(status);
        console.log(startDate && startDate.toDate());
        console.log(endDate && endDate.toDate());
    }, [status, setStatus, startDate, endDate]);

    const onChangeStartDate = (field, value) => {
        console.log('onChange', field, value && value.format(FromPicker.getFormat(SHOW_TIME)));
        setStartDate(value)
        // this.setState({
        //     [field]: value,
        // });
    };

    const onChangeEndDate = (field, value) => {
        console.log('onChange', field, value && value.format(FromPicker.getFormat(SHOW_TIME)));
        setEndDate(value)
        // this.setState({
        //     [field]: value,
        // });
    };

    const disabledEndDate = (endDate) => {
        if (!endDate) {
            return false;
        }
        const currStartDate = startDate;
        if (!currStartDate) {
            return false;
        }
        return SHOW_TIME ? endDate.isBefore(startDate) :
            endDate.diff(startDate, 'days') <= 0;
    }

    const disabledStartDate = (startDate) => {
        if (!startDate) {
            return false;
        }
        const currEndDate = endDate;
        if (!currEndDate) {
            return false;
        }
        return SHOW_TIME ? endDate.isBefore(startDate) :
            endDate.diff(startDate, 'days') <= 0;
    }


    // componentDidMount() {
    //     orderService.getPendingOrders(this.state.status).then(pendingOrders => {
    //         if (pendingOrders) {

    //             const isLoading = false;
    //             let orders = addDateToString(pendingOrders);
    //             this.setState({ orders, isLoading })
    //         }
    //     }).catch(err => console.log(err))
    // }

    // componentDidUpdate() {
    //     orderService.getPendingOrders(this.state.status).then(pendingOrders => {
    //         if (pendingOrders) {

    //             const isLoading = false;
    //             let orders = addDateToString(pendingOrders);
    //             this.setState({ orders, isLoading })
    //         }
    //     }).catch(err => console.log(err))
    //     console.log(this.state.status);
    // }

    // render() {
    // const { orders, isLoading, status } = this.state;
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

                        <div
                            style={{ width: 1024, margin: 20 }}
                        >
                            <span>
                                <span>От дата:</span>
                                <Picker
                                    disabledDate={disabledStartDate}
                                    value={startDate}
                                    onChange={onChangeStartDate.bind(this, 'startDate')}
                                />
                            </span>

                            <span>
                                <span>До дата:</span>
                                <Picker
                                    disabledDate={disabledEndDate}
                                    value={endDate}
                                    onChange={onChangeEndDate.bind(this, 'endDate')}
                                />
                            </span>
                            <span>Статус:</span>
                            <select name="status" value={status} onChange={handleFormElementChange} placeholder="Изберете">
                                <option value="">-</option>
                                <option value="Pending">Чакащи</option>
                                <option value="Approve">Одобрени</option>
                                <option value="Comming">За дата</option>
                                <option value="Done">Доставени</option>
                                {/* <option value="archive">Архиви</option> */}
                            </select>
                        </div>
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
    // }
}

export default AdminOrders;