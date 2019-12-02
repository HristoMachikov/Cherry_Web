import React from 'react';
import { Link } from 'react-router-dom';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const AdminSingle = ({ index, date, total, status, id }) => {

    return (
        <tr>
            <td>{index}</td>
            <td>{date}</td>
            <td>{total} лв</td>
            <td>{status}</td>
            <td><Link to={`/order/details/${id}`}>Виж</Link></td>
            <td>
                <Link className="primary-btn" to={`/admin/remove-order/${id}`}>Изтрии</Link>
                <Link className="primary-btn" to={`/admin/approve-order/${id}`}>Одобри</Link>
            </td>
        </tr>
    );
}

export default AdminSingle;