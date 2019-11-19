import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function Cart({ id, imagePath, sort, price, description, isAdmin }) {

    return (<li className="site-section-inner">
        <p className="imges">
            <img src={imagePath} alt={imagePath} />
        </p>
        <p className="header"></p>
        <h3>{sort}</h3>
        {/* <p> */}
        <h4>{price} лв/кг</h4>
        {/* </p> */}
        <p className="description">
            {description}
        </p>
        <p>
            {isAdmin
                ? <Fragment>
                    <Link className="primary-btn" to={`/cherry/edit/${id}`}>Промени</Link>
                    <Link className="primary-btn" to={`/cherry/remove/${id}`}>Изтрии</Link>
                </Fragment>
                : <Fragment>
                    <Link className="primary-btn" to={`/cherry/details/${id}`}>Детайли</Link>
                    <Link className="primary-btn" to={`/user/new-order/${id}`}>Поръчай</Link>
                </Fragment>
            }
        </p>
        <br />
    </li>)
}

Cart.propTypes = {
    id: PropTypes.string,
    imagePath: PropTypes.string,
    sort: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string
}

export default Cart;