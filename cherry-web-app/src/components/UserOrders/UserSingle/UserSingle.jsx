import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import OrderedProducts from '../../AdminOrders/OrderedProducts/OrderedProducts';

const UserSingle = ({ index, date, total, status, id, products }) => {

    return (
        <Fragment>
            <tr>
                <td>{index}</td>
                <td>{date}</td>
                <td>{total.toFixed(2)} лв</td>
                <td>{status}</td>
                <td>
                    <label className="check-ordered-products" htmlFor={index}>Виж</label>
                    {/* <Link to={`/order/my-orders/${id}`}>Виж</Link> */}
                </td>
                <td>-</td>
            </tr>
            <input className="check-ordered-products" type="checkbox" name={index} id={index} />
            <OrderedProducts products={products} />
        </Fragment>
    );
}

export default UserSingle;