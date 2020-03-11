import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import UserProducts from '../UserProducts/UserProducts';

import commingDateToStr from '../../../shared/methods/comming-date-to-str';
import bgStatus from '../../../shared/methods/bg-status';

const UserSingle = ({ index, date, total, status, id, products, dateComming }) => {

    return (
        <Fragment>
            <tr>
                <td>{index}</td>
                <td>{date}</td>
                <td>{total.toFixed(2)} лв</td>
                <td>
                    {status === "Comming"
                        ? commingDateToStr(dateComming)
                        : bgStatus(status)
                    }
                </td>
                <td>
                    <label className="check-ordered-products" htmlFor={index}>Виж</label>
                    {/* <Link to={`/order/my-orders/${id}`}>Виж</Link> */}
                </td>
                <td>-</td>
            </tr>
            <input className="check-ordered-products" type="checkbox" name={index} id={index} />
            <UserProducts products={products} />
        </Fragment>
    );
}

export default UserSingle;