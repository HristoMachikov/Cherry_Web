import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Product from './Product/Product';
import orderService from '../../services/order-service';

class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: props.basket || {},
            total: 0
        }
    }

    componentDidMount() {
        const currentId = this.props.params.id;
        let { products } = this.state;
        if (Object.keys(products).length) {
            const alredyAdded = products.hasOwnProperty(currentId);
            const total = Object.keys(products).reduce((acc, product) => {
                return acc + products[product][subTotal];
            }, 0);
            if (currentId && !alredyAdded) {
                addNewProduct(currentId, products);
            } else {
                this.setState({ total })
            }
        } else {
            if (currentId) {
                addNewProduct(currentId, products);
            }
        }
    }

    addNewProduct = (productId, allProducts) => {
        return orderService.getNewProduct(productId).then(product => {
            if (product.sort) {
                allProducts[productId] = { ...product[0], weigth=0, subTotal=0, quantity=0 }
                this.setState({ products: allProducts })
            }
        }).catch(err => console.log(err));
    }

    handleFormElementChange(event) {
        const { name, value, dataId } = event.target;

        const { products } = this.state;
        const subTotal = 0;
        if (name === "weigth") {
            subTotal = products[dataId].quantity * value;
        }
        if (name === "quantity") {
            subTotal = products[dataId].weigth * value;
        }
        const prevTotal = Object.keys(products)
            .filter(key => key !== dataId)
            .reduce((acc, key) => {
                return acc + products[key].subTotal;
            }, 0);
        const total = prevTotal + subTotal;
        products[dataId][name] = value;
        this.setState({ total, products });
    }

    handleClickDelete(event) {
        console.log(event);

    }

    handleClickTakeMore = () => {

    }

    handleSubmit = () => {
        const { userId } = this.props;
        const { total, products } = this.state;
        const cherryArray = JSON.stringify(products);
        orderService.postOrder({ total, creatorId: userId, cherryArray }).then(res => {
            if (res.cherryArray) {
                toast.success("Поръчката е изпратена!", {
                    closeButton: false
                })
                this.props.history.push({
                    pathname: '/',
                    state: {}
                });
            } else {
                toast.error("Поръчката не е изпратена!", {
                    closeButton: false
                })
                return null;
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { products } = this.state;
        return (
            <section class="site-section home" >
                <ToastContainer autoClose={4000} />
                <article class="schedule" id="schedule">
                    <header>
                        <h2>Списък</h2><span></span>
                    </header>
                    {Object.keys(products).length
                        ? <Fragment>
                            <table class="main-table new-order">
                                <thead>
                                    <tr>
                                        <th>Снимка</th>
                                        <th>Сорт</th>
                                        <th>Цена</th>
                                        <th>Количество</th>
                                        <th>Сума</th>
                                        <th>Детайли</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {products.map((product) => {
                                        if (!cherry.isPublic && !isAdmin) {
                                            return null;
                                        } else {
                                            return <Product
                                                state={this.props.location.state[product._id]}
                                                history={this.props.history}
                                                key={product._id}
                                                id={product._id}
                                                sort={product.sort}
                                                imagePath={`/static${product.imagePath}`}
                                                price={product.price}
                                                handleFormElementChange={this.handleFormElementChange}
                                                handleClickDelete={this.handleClickDelete}
                                            // description={cherry.description}
                                            // isAdmin={isAdmin}
                                            >
                                            </Product>;
                                        }
                                    })}

                                    {/* <form id="refresh-form" action="/user/new-order/{{_id}}" method="post">
                                <tr>
                                    <td><img src={imagePath} alt={imagePath} width="100px" /></td>
                                    <td>{{ sort }}</td>
                                    <td>{{ price }} лв</td>
                                    <td>
                                        <input type="number" min="1" max="999" name="quantity" value={quantity} />
                                        <span> x </span>
                                        <span>
                                            <select name="weigth" id="weigth">
                                                {each_options}
                                                <option value={value}
                                                // {if_selected} selected{_if}
                                                >{title}</option>
                                                {each}
                                            </select>
                                        </span>
                                    </td>
                                    <td>
                                        <input type="number" min="1" max="9999" disabled name="subTotal" value={subTotal} />
                                        <span> лв</span>
                                    </td>
                                    <td>
                                        <Link class="primary-btn" to={`/user/remove/${_id}`}>Изтрий</Link>
                                        <input class="primary-btn" type="submit" value="Сумирай" />
                                    </td>
                                </tr>
                            </form> */}
                                </tbody>
                            </table>
                            <div style="text-align:center">
                                <Link class="primary-btn" to="/" onClick={this.handleClickTakeMore}>Вземи още</Link>
                                <span class="total-price">Общо: {user.total} лв</span>
                                <Link class="primary-btn" to="/order/my-orders" оnClick={this.handleSubmit}>Поръчай!</Link>
                            </div>

                        </Fragment>
                        : <header>
                            <h4>Списъкът е празе!</h4>
                        </header>
                    }
                </article>
            </section>
        );
    }
}

export default Basket;