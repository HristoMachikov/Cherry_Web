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
            products: JSON.parse(localStorage.getItem('state')) || {},
            // products: props.location.state|| {},
            total: 0,
            isLoading: true
        }
    }

    componentDidMount() {
        const currentId = this.props.match && this.props.match.params.id;
        let { products } = this.state;
        const isLoading = false;

        if (Object.keys(products).length) {
            const alredyAdded = products.hasOwnProperty(currentId);
            const total = Object.keys(products).reduce((acc, product) => {
                return acc + products[product].subTotal;
            }, 0);
            debugger;
            if (currentId && !alredyAdded) {
                orderService.getNewProduct(currentId).then(product => {
                    if (product.sort) {
                        debugger;
                        products[currentId] = { ...product, weigth: 0, subTotal: 0, quantity: 1 }

                        this.setState({ products, total, isLoading })
                    }
                }).catch(err => console.log(err));
            } else {
                this.setState({ total, isLoading })
            }
        } else {
            debugger;
            if (currentId) {
                orderService.getNewProduct(currentId).then(product => {
                    if (product.sort) {
                        products[currentId] = { ...product, weigth: 0, subTotal: 0, quantity: 1 }
                        this.setState({ products, isLoading })
                    }
                }).catch(err => console.log(err));
            } else {
                this.setState({ products, isLoading })
            }
        }
    }

    handleClickTakeMore = () => {
        debugger;
        localStorage.setItem('state', `${JSON.stringify(this.state.products)}`)
        this.props.history.push({ pathname: '/order/products', state: this.state.products });
    }
    // addNewProduct = (productId, allProducts) => {
    //     return orderService.getNewProduct(productId).then(product => {
    //         if (product.sort) {
    //             console.log(product);
    //             debugger;
    //             allProducts[productId] = { ...product, weigth: 0, subTotal: 0, quantity: 0 }
    //             // const {products} = this.state;
    //             // this.setState({ [products]: allProducts })
    //             this.setState({ allProducts })
    //         }
    //     }).catch(err => console.log(err));
    // }

    handleFormElementChange = (event) => {
        const { name, value, id } = event.target;
        const { products } = this.state;
        let subTotal = 0;

        if (name === "weigth") subTotal = products[id].quantity * value;
        if (name === "quantity") subTotal = products[id].weigth * value;
        if (Number(subTotal) < 0) subTotal = 0;

        const prevTotal = Object.keys(products)
            .filter(key => key !== id)
            .reduce((acc, key) => {
                return acc + products[key].subTotal;
            }, 0);

        const { price } = products[id];
        const total = (prevTotal + subTotal) * price;
        products[id][name] = value;
        products[id].subTotal = subTotal * price;
        this.setState({ total, products }, () => {
            localStorage.setItem('state', `${JSON.stringify(this.state.products)}`)
        });
    }

    handleClickDelete = (event) => {
        const { id } = event.target;
        const { products } = this.state;
        const subTotalDelete = products[id].weigth * products[id].quantity * products[id].price;
        const prevTotal = Object.keys(products)
            .reduce((acc, key) => {
                return acc + products[key].subTotal;
            }, 0);
        const total = prevTotal - subTotalDelete;
        debugger;
        delete products[id];
        debugger;
        this.setState({ products, total }, () => {
            ////? може да се махне от тук
            localStorage.setItem('state', `${JSON.stringify(this.state.products)}`)
            debugger;
            this.props.history.push({
                pathname: '/order/products',
                state: this.state.products
            });
        })
    }


    handleSubmit = () => {
        const { userId } = this.props;
        const { total, products } = this.state;
        const productsJson = JSON.stringify(products);
        orderService.postOrder({ total, creatorId: userId, productsJson }).then(res => {
            console.log(res)
            if (res.ok) {
                toast.success("Поръчката е изпратена!", {
                    closeButton: false
                })
                localStorage.removeItem('state');
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
        console.log(this.props)
        const { products, isLoading } = this.state;
        debugger;
        return (
            <section className="site-section home" >
                <ToastContainer autoClose={4000} />
                <article className="schedule" id="schedule">
                    {isLoading ?
                        <header>
                            <h2>Loading...</h2>
                        </header>
                        : <Fragment>
                            <header>
                                <h2>Списък</h2><span></span>
                            </header>
                            {Object.keys(products).length
                                ? <Fragment>
                                    <table className="main-table new-order">
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

                                            {Object.keys(products).map((product) => {
                                                // const { _id, sort, imagePath, price, weigth, subTotal, quantity } = products[product];
                                                // const state = this.props.basket && this.props.basket[product] || {}
                                                return <Product
                                                    // state={state}
                                                    history={this.props.history}
                                                    key={products[product]._id}
                                                    id={products[product]._id}
                                                    sort={products[product].sort}
                                                    imagePath={`/static${products[product].imagePath}`}
                                                    price={products[product].price}
                                                    weigth={products[product].weigth}
                                                    quantity={products[product].quantity}
                                                    subTotal={products[product].subTotal}
                                                    handleFormElementChange={this.handleFormElementChange}
                                                    handleClickDelete={this.handleClickDelete}
                                                // description={cherry.description}
                                                // isAdmin={isAdmin}
                                                >
                                                </Product>;

                                            })}


                                        </tbody>
                                    </table>
                                    <div className="basket-totla"
                                    // style="text-align:center"
                                    >
                                        <Link className="primary-btn" onClick={this.handleClickTakeMore} to="/" >Вземи още</Link>
                                        <span className="total-price">Общо: {this.state.total.toFixed(2)} лв</span>
                                        <Link className="primary-btn" to="/order/my-orders" onClick={this.handleSubmit}>Поръчай!</Link>
                                    </div>

                                </Fragment>
                                : <header>
                                    <h4>Списъкът е празе!</h4>
                                </header>
                            }
                        </Fragment>
                    }
                </article>
            </section>
        );
    }
}

export default Basket;