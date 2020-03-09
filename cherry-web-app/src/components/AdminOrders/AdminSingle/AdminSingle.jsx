import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OrderedProducts from '../OrderedProducts/OrderedProducts';
import Picker from '../../Home/Calendar/Picker/Picker';
import commingDateToStr from '../../../shared/methods/comming-date-to-str';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
const allStatus = ["Pending", "Approve", "Comming", "Done", "Archive"];

const AdminSingle = ({ index, date, total, status, id, products, dateComming, user }) => {
    const [commingDate, setCommingDate] = React.useState(null);
    
    // React.useEffect(() => {

    //     commingDate && commingDate.set({ 'hour': 23, 'minute': 59, 'second': 59 });

    // }, [commingDate]);
    const onChangeCommingDate = (field, value) => {
        // console.log('onChange', field, value && value.format(FromPicker.getFormat(SHOW_TIME)));
        // value.set({ 'hour': 23, 'minute': 59, 'second': 59 });
        setCommingDate(value)
        // console.log(value.locale('bg').utcOffset(2))
    };

    const onClickNextStatus = (e) => {
        if (!commingDate && status === "Approve") {
            e.preventDefault()
        }
    }

    const indexOfStatus = allStatus.indexOf(status);

    const statusNext = allStatus[indexOfStatus + 1];
    const statusBefore = allStatus[indexOfStatus - 1];

    let currStatus = status;
    if (status === "Comming") {
        currStatus = commingDateToStr(dateComming);
    }

    return (
        <Fragment>
            <tr>
                <td>{index}</td>
                <td>{date}</td>
                <td>{total.toFixed(2)} лв</td>
                <td>
                    {status === "Approve"
                        ? <Picker
                            placeholder={status}
                            value={commingDate}
                            onChange={onChangeCommingDate.bind(this, 'commingDate')}
                        />
                        : currStatus}
                </td>
                <td>
                    <label className="check-ordered-products" htmlFor={index}>Виж</label>
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
                    {["Comming", "Done", "Archive"].includes(status)
                        ? <Link className="primary-btn back" to={`/admin/approve-order/${id}/${statusBefore}`}></Link>
                        : <Link className="primary-btn remove" to={`/admin/remove-order/${id}`}></Link>
                    }
                </td>
            </tr>
            <input className="check-ordered-products" type="checkbox" name={index} id={index} />
            <OrderedProducts products={products} user={user} id={id} />
        </Fragment>
    );
}

export default AdminSingle;