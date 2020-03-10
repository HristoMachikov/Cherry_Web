import React, { Fragment, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const OrderedProducts = ({ products, user, id }) => {
    const [editAddress, setEditAddress] = useState(true);
    const [currAddress, setCurrAddress] = useState(user.address);

    const onClickEditAddress = () => {
        setEditAddress(false);
    }

    const onChangeAddress = (event) => {
        setCurrAddress(event.target.value)
    }
    const onClickBack = () => {
        setEditAddress(true);
        setCurrAddress(user.address)
    }

    const textRef = useRef(null);

    useEffect(() => {
        if (!editAddress) {
            textRef.current.focus();
        }
    }, [editAddress])

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
                        {currAddress
                            ? <a className="user-address" href={`http://maps.google.com/?q=${currAddress}`}>{currAddress}</a>
                            : <span>Незададен адрес</span>}
                    </td>
                    : <td className="user-info address">
                        <textarea className="edit-user-address" ref={textRef} onChange={e => onChangeAddress(e)}>{currAddress}</textarea>
                    </td>
                }
                <td className="user-info">
                    {editAddress
                        ? <Link
                            className={`primary-btn edit-address`}
                            onClick={onClickEditAddress}
                        >
                        </Link>
                        : <Fragment>
                            {currAddress !== user.address
                                ? <Link
                                    className="primary-btn edit-address-success"
                                    to={`/admin/edit-address/${id}/${currAddress}`}
                                ></Link>
                                : <Link
                                    className="primary-btn back"
                                    // to={`/admin/edit-address/${id}/${currAddress}`}
                                    onClick={onClickBack}
                                ></Link>
                            }
                        </Fragment>
                    }
                </td>
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
                </tr>
            })}
        </div>
    </Fragment>);
}

export default OrderedProducts;