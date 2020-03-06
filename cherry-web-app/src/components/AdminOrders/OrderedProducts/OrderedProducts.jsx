import React, { Fragment } from 'react';

const OrderedProducts = ({ products, user }) => {
    const productsObj = JSON.parse(products)
    return (<Fragment>
        <div className="template-ordered-products">
           {user && <tr className="ordered-products">
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                    <span>-</span>
                </td>
                <td>
                    <span>-</span>
                </td>
                <td>
                    <span>-</span>
                </td>
            </tr>}
            {Object.keys(productsObj).map((product, index) => {
                let { imagePath, sort, price, quantity, weigth, subTotal } = productsObj[product];
                return <tr className="ordered-products" key={index}>
                    <td><img src={`/static${imagePath}`} alt={imagePath} width="100px" /></td>
                    <td>{sort}</td>
                    <td>{price.toFixed(2)} лв/кг</td>
                    <td>
                        <span>{quantity}</span>
                        <span className="multiply">x</span>
                        <span>{weigth} кг</span>
                    </td>
                    <td>
                        <span className="sub-total">{subTotal.toFixed(2)} лв</span>
                    </td>
                    <td>
                        <span>-</span>
                    </td>
                </tr>
            })}
        </div>
    </Fragment>);
}

export default OrderedProducts;