import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function Cart({ imagePath, sort, price, description }) {

    return (<li className="site-section-inner">
        <p className="imges">
            <img src={imagePath} alt={imagePath} />
        </p>
        <p className="header">
        </p>
        <h3>{ sort }</h3>

        <p>
            <h4>{ price } лв/кг</h4>
        </p>
        <p className="description">
            { description }
        </p>
        <p>
            <Link className="primary-btn" to="/cherry/details/{_id}">Детайли</Link>
            <Link className="primary-btn" to="/user/new-order/{{_id}}">Поръчай</Link>
        </p>
        <br />
    </li>)
}

Cart.propTypes = {
    isAdmin: PropTypes.bool
}

export default Cart;