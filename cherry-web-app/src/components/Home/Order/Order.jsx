import React from 'react';
import { Link } from 'react-router-dom';

function Order() {
    return (<article className="order" id="order">
        <header>
            <h2>Поръчай</h2><span></span>
        </header>
        <h4 className="order-text">Можете да поръчате по телефона или през сайта от тук.</h4>
        <p className="btn">
            <Link className="primary-btn" to="/menu">Поръчай за<span>Юни 2020</span></Link>
        </p>
    </article>);
}

export default Order;