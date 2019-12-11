import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OrderedProducts from '../OrderedProducts/OrderedProducts';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const AdminSingle = ({ index, date, total, status, id, products }) => {

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
                <td>
                    <Link className="primary-btn approve" to={`/admin/approve-order/${id}`}></Link>
                    <Link className="primary-btn remove" to={`/admin/remove-order/${id}`}></Link>
                </td>
            </tr>
            <input className="check-ordered-products" type="checkbox" name={index} id={index} />
            <OrderedProducts products={products} />
        </Fragment>
    );
}

export default AdminSingle;