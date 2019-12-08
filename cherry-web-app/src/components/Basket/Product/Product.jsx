import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Product extends Component {

    handleClickDelete = this.props.handleClickDelete;
    handleFormElementChange = this.props.handleFormElementChange;

    render() {
        const { id, imagePath, sort, price, quantity, weigth, subTotal } = this.props;
        return (
            <tr>
                <td><img src={imagePath} alt={imagePath} width="100px" /></td>
                <td>{sort}</td>
                <td>{price.toFixed(2)} лв/кг</td>
                <td>
                    <input
                        type="number"
                        min="1" max="999"
                        name="quantity"
                        id={id}
                        value={quantity}
                        onChange={this.handleFormElementChange}
                    />
                    <span className="multiply">x</span>
                    <span>
                        <select name="weigth" id={id} value={weigth} onChange={this.handleFormElementChange}>
                            <option value="0">0 кг</option>
                            <option value="6">6 кг</option>
                            <option value="8">8 кг</option>
                            <option value="10">10 кг</option>
                            <option value="12">12 кг</option>
                        </select>
                    </span>
                </td>
                <td>
                    <span className="sub-total">{subTotal.toFixed(2)} лв</span>
                </td>
                <td>
                    <button className="primary-btn remove" id={id} onClick={this.handleClickDelete}></button>
                </td>
            </tr>
        )
    }
}

Product.propTypes = {
    id: PropTypes.string,
    imagePath: PropTypes.string,
    sort: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    weigth: PropTypes.number,
    subTotal: PropTypes.number,
}

export default Product;