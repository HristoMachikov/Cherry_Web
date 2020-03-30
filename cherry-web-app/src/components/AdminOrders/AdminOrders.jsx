import React, { Component, Fragment } from 'react';

import AdminSingle from './AdminSingle/AdminSingle';

import Picker from '../../shared/Picker/Picker';
// import * as FromPicker from '../../shared/Picker/Picker';

import orderService from '../../services/order-service';

import dateToString from '../../shared/methods/date-to-string';

import bgStatus from '../../shared/methods/bg-status';

const addDateToString = (orders) => {
    let ordersArr = orders.map(order => {
        order.dateToStr = dateToString(order.date)
        return order;
    });
    return ordersArr;
}

const SHOW_TIME = true;

const AdminOrders = () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [orders, setOrders] = React.useState([]);
    const [status, setStatus] = React.useState("");
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    // const handleFormElementChange = React.useCallback((event) => {
    //     let status = event.target.value;
    //     setStatus(status);
    // }, [status, setStatus]);

    const handleFormElementChange = (event) => {
        let status = event.target.value;
        setStatus(status);
    };

    React.useEffect(() => {
        startDate && startDate.set({ 'hour': 0, 'minute': 0, 'second': 0 });
        endDate && endDate.set({ 'hour': 23, 'minute': 59, 'second': 59 });
        orderService.getAdminOrders(status, startDate, endDate).then(adminOrders => {
            if (adminOrders) {
                setIsLoading(false);
                let orders = addDateToString(adminOrders);
                setOrders(orders);
            }
        }).catch(err => console.log(err))
    }, [status, setStatus, startDate, endDate]);

    const onChangeStartDate = (field, value) => {
        // console.log('onChange', field, value && value.format(FromPicker.getFormat(SHOW_TIME)));
        setStartDate(value)
    };

    const onChangeEndDate = (field, value) => {
        // console.log('onChange', field, value && value.format(FromPicker.getFormat(SHOW_TIME)));
        setEndDate(value)
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

    // const bgStatus = (status) => {
    //     switch (status) {
    //         case "Pending": return "Чакащи";
    //         case "Approve": return "Одобрени";
    //         case "Comming": return "Идващи";
    //         case "Done": return "Доставени";
    //         case "Archive": return "Архивни";
    //         default: return "Всички"
    //     }
    // }
    return (
        <section className="site-section home">
            <article className="schedule" id="schedule">
                {isLoading ?
                    <header>
                        <h2>Loading...</h2>
                    </header>
                    : <Fragment>
                        <header>
                            <h2>{bgStatus(status)} поръчки</h2><span></span>
                        </header>

                        <div className="orders-search">
                            <div>
                                <span className="search-name">Статус:</span>
                                <select name="status" value={status} onChange={handleFormElementChange} placeholder="Изберете">
                                    <option value="">-</option>
                                    <option value="Pending">Чакащи</option>
                                    <option value="Approve">Одобрени</option>
                                    <option value="Comming">Идващи</option>
                                    <option value="Done">Доставени</option>
                                    <option value="Archive">Архивни</option>
                                </select>
                            </div>
                            <div className="picker">
                                <span className="search-name">От дата:</span>
                                <Picker
                                    disabledDate={disabledStartDate}
                                    value={startDate}
                                    onChange={onChangeStartDate.bind(this, 'startDate')}
                                />
                            </div>

                            <div className="picker">
                                <span className="search-name">До дата:</span>
                                <Picker
                                    disabledDate={disabledEndDate}
                                    value={endDate}
                                    onChange={onChangeEndDate.bind(this, 'endDate')}
                                />
                            </div>
                        </div>
                        {orders.length ? <table className="main-table">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>Дата</th>
                                    <th>Общо</th>
                                    <th>Статус</th>
                                    <th>Инфо</th>
                                    <th>Действия</th>
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
                                        dateComming={order.commingDate}
                                        total={order.total}
                                        products={order.productsJson}
                                        user={order.user}
                                    >
                                    </AdminSingle>;
                                })}
                            </tbody>
                        </table>
                            : <header>
                                <h4>В момента няма {status === "" ? "" : bgStatus(status).toLowerCase()} поръчки!</h4>
                            </header>
                        }
                    </Fragment>
                }
            </article>
        </section>
    );
}

export default AdminOrders;