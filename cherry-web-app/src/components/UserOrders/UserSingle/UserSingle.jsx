import React from 'react';
import { Link } from 'react-router-dom';

const UserSingle = ({ index, date, total, status, id }) => {

    return (
        <tr>
            <td>{index}</td>
            <td>{date}</td>
            <td>{total.toFixed(2)} лв</td>
            <td>{status}</td>
            <td><Link to={`/order/details/${id}`}>Виж</Link></td>
            <td>-</td>
        </tr>
    );
}

export default UserSingle;