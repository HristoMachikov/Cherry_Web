import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quantity: this.props.quantity,
            weigth: this.props.weigth
        }
        // this.handleClickDelete = this.props.handleClickDelete.bind(this);
        // this.handleFormElementChange = this.props.handleFormElementChange.bind(this);
    }

    render() {
        const { id, imagePath, sort, price, quantity, weigth, subTotal } = this.props;
        // const { quantity, weigth, subTotal } = this.props.state;
        return (
            // <form id="refresh-form">
            <tr>
                <td><img src={imagePath} alt={imagePath} width="100px" /></td>
                <td>{sort}</td>
                <td>{price} лв</td>
                <td>
                    <input
                        type="number"
                        min="1" max="999"
                        name="quantity"
                        dataid={id}
                        value={quantity}
                        onChange={this.handleFormElementChange}
                    />
                    <span> x </span>
                    <span>
                        <select name="weigth" id="weigth" dataid={id} value={weigth} onChange={this.handleFormElementChange}>
                            <option value="0">0 kg</option>
                            <option value="6">6 kg</option>
                            <option value="8">8 kg</option>
                            <option value="10">10 kg</option>
                            <option value="12">10 kg</option>
                        </select>
                    </span>
                </td>
                <td>
                    <input type="number" min="1" max="9999" disabled name="subTotal" value={subTotal} />
                    <span> лв</span>
                </td>
                <td>
                    <Link className="primary-btn" to={`/order/products`} dataid={id} onClick={this.handleClickDelete}>Изтрий</Link>
                    {/* <input class="primary-btn" type="submit" value="Сумирай" /> */}
                </td>
            </tr>
            // </form>

            // <li className="site-section-inner">
            //     <p className="imges">
            //         <img src={imagePath} alt={imagePath} />
            //     </p>
            //     <p className="header"></p>
            //     <h3>{sort}</h3>
            //     {/* <p> */}
            //     <h4>{Number(price).toFixed(2)} лв/кг</h4>
            //     {/* </p> */}
            //     <p className="description">
            //         {description}
            //     </p>
            //     <p>
            //         {isAdmin
            //             ? <Fragment>
            //                 <Link className="primary-btn" to={`/cherry/edit/${id}`}>Промени</Link>
            //                 <Link className="primary-btn" to={`/cherry/remove/${id}`}>Изтрии</Link>
            //             </Fragment>
            //             : <Fragment>
            //                 <Link className="primary-btn" to={`/cherry/details/${id}`}>Детайли</Link>
            //                 <Link className="primary-btn" to={`/user/new-order/${id}`}>Поръчай</Link>
            //             </Fragment>
            //         }
            //     </p>
            //     <br />
            // </li>
        )
    }

}

// Product.propTypes = {
//     id: PropTypes.string,
//     imagePath: PropTypes.string,
//     sort: PropTypes.string,
//     price: PropTypes.number,
// }

export default Product;