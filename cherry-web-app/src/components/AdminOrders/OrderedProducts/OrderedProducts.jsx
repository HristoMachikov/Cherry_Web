import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const OrderedProducts = ({ products, user, id }) => {
    const [editAddress, setEditAddress] = React.useState(true);
    const [currAddress, setCurrAddress] = React.useState(user.address);
    const onClickEditAddress = (e) => {
        setEditAddress(false);
    }
    const productsObj = JSON.parse(products)
    return (<Fragment>
        <div className="template-ordered-products">
            {user && <tr className="ordered-products">
                <td className="user-info">{user.username}</td>
                <td className="user-info">
                    <a href={`tel:${user.phone}`}>{user.phone}</a>
                </td>
                <td className="user-info">
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                {editAddress
                    ? <td className="user-info">
                        {user.address ? <span>{user.address}</span> : <span>Незададен адрес</span>}
                    </td>
                    : <td className="user-info">
                        <textarea rows="1">гр.София, жк"Дианабад"</textarea>
                    </td>
                }
                <td className="user-info">
                    {editAddress
                        ? <Link
                            className={`primary-btn edit-address`}
                            onClick={e => onClickEditAddress(e)}
                        >
                        </Link>
                        : <Link
                            className="primary-btn edit-address-success"
                            to={`/admin/edit-address/${id}}`}
                        ></Link>
                    }
                </td>
                {/* <td>
                    <span>-</span>
                </td> */}
            </tr>}
            {Object.keys(productsObj).map((product, index) => {
                let { imagePath, sort, price, quantity, weigth, subTotal } = productsObj[product];
                return <tr className="ordered-products" key={index}>
                    <td><img src={`/static${imagePath}`} alt={imagePath} width="100px" /></td>
                    <td>{sort}</td>
                    <td>
                        <span className="sub-total">{subTotal.toFixed(2)} лв</span>
                    </td>
                    <td>
                        <span>{quantity}</span>
                        <span className="multiply">x</span>
                        <span>{weigth} кг</span>
                    </td>
                    <td>{price.toFixed(2)} лв/кг</td>
                    {/* <td>
                        <span>-</span>
                    </td> */}
                </tr>
            })}
        </div>
    </Fragment>);
}

export default OrderedProducts;