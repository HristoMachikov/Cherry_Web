import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OrderedProducts from '../OrderedProducts/OrderedProducts';
import Picker from '../../../shared/Picker/Picker';
import commingDateToStr from '../../../shared/methods/comming-date-to-str';
import bgStatus from '../../../shared/methods/bg-status';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const allStatus = ["Pending", "Approve", "Comming", "Done", "Archive"];

const AdminSingle = ({ index, date, total, status, id, products, dateComming, user }) => {
    const [commingDate, setCommingDate] = React.useState(null);
    const [showInfo, setShowInfo] = React.useState(false);
  
    const onChangeCommingDate = (field, value) => {
        setCommingDate(value)
    };

    const onClickNextStatus = (e) => {
        if (!commingDate && status === "Approve") {
            e.preventDefault()
        }
    }

    const onClickCheckbox = (event) => {
        setShowInfo(event.target.checked);
    }

    const indexOfStatus = allStatus.indexOf(status);

    const statusNext = allStatus[indexOfStatus + 1];
    const statusBefore = allStatus[indexOfStatus - 1];

    return (
        <Fragment>
            <tr>
                <td>{index}</td>
                <td>{date}</td>
                <td>{total.toFixed(2)} лв</td>
                <td className="picker">
                    {status === "Approve"
                        ? <Picker
                            placeholder={bgStatus(status)}
                            value={commingDate}
                            onChange={onChangeCommingDate.bind(this, 'commingDate')}
                        />
                        : <Fragment>
                            {status === "Comming"
                                ? commingDateToStr(dateComming)
                                : bgStatus(status)
                            }
                        </Fragment>
                    }
                </td>
                <td>
                    <label className="check-ordered-products" htmlFor={index}>{showInfo ? "Скрий" : "Виж"}</label>
                    {/* <Link to={`/order/my-orders/${id}`}>Виж</Link> */}
                </td>
                <td>
                    {status !== "Archive"
                        ? <Link
                            className={`primary-btn ${statusNext.toLowerCase()}`}
                            to={`/admin/approve-order/${id}/${statusNext}${commingDate ? `/${commingDate}` : ""}`}
                            onClick={e => onClickNextStatus(e)}>
                        </Link>
                        : <Link className="primary-btn remove" to={`/admin/remove-order/${id}`}></Link>
                    }
                    {["Approve", "Comming", "Done", "Archive"].includes(status)
                        ? <Link className="primary-btn back" to={`/admin/approve-order/${id}/${statusBefore}`}></Link>
                        : <Link className="primary-btn remove" to={`/admin/remove-order/${id}`}></Link>
                    }
                </td>
            </tr>
            <input className="check-ordered-products" type="checkbox" name={index} id={index} onClick={onClickCheckbox} />
            <OrderedProducts products={products} user={user} id={id} />
        </Fragment>
    );
}

export default AdminSingle;