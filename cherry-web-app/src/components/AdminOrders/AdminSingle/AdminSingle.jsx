import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OrderedProducts from '../OrderedProducts/OrderedProducts';
import Picker from '../../Home/Calendar/Picker/Picker';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const allStatus = ["Pending", "Approve", "Comming", "Done", "Archive"];

const AdminSingle = ({ index, date, total, status, id, products }) => {

    const indexOfStatus = allStatus.indexOf(status);
    const stepForward = indexOfStatus + 1;
    const stepBack = indexOfStatus - 1;
    return (
        <Fragment>
            <tr>
                <td>{index}</td>
                <td>{date}</td>
                <td>{total.toFixed(2)} лв</td>
                <td>
                {status === "Approve" 
                ?<Picker/>
                :status}
                </td>
                <td>
                    <label className="check-ordered-products" htmlFor={index}>Виж</label>
                    {/* <Link to={`/order/my-orders/${id}`}>Виж</Link> */}
                </td>
                <td>{status !== "Approve" ?
                    <Link className="primary-btn approve" to={`/admin/approve-order/${id}`}></Link>
                    : <Link className="primary-btn comming" to={`#`}></Link>
                }
                    <Link className="primary-btn remove" to={`/admin/remove-order/${id}`}></Link>
                </td>
            </tr>
            <input className="check-ordered-products" type="checkbox" name={index} id={index} />
            <OrderedProducts products={products} />
        </Fragment>
    );
}

export default AdminSingle;