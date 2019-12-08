import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';

import Cart from './Cart/Cart';

import cherryService from '../../services/cherry-service'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            cherrys: []
        };
    }
    componentDidMount() {
        const { isAdmin } = this.props;
    
        (isAdmin ?
            cherryService.getProductsAdmin().then(cherrys => {
                const isLoading = false;
                this.setState({ cherrys, isLoading });
            }).catch(err => {
                console.log(err);
            }) :
            cherryService.getProducts().then(cherrys => {
                const isLoading = false;
                this.setState({ cherrys, isLoading });
            }).catch(err => {
                console.log(err);
            })
        )
    }

    render() {
        const { cherrys, isLoading } = this.state;
        const { isAdmin } = this.props;
        return <section className="site-section home">
            <article className="sorts" id="sorts">
                {isLoading ?
                    <header>
                        <h2>Loading...</h2>
                    </header>
                    : <Fragment>
                        <header>
                            <h2>Предлагани сортове</h2><span></span>
                        </header>
                        {cherrys.length ?
                            <ul>
                                {cherrys.map((cherry) => {
                                    return <Cart
                                        key={cherry._id}
                                        id={cherry._id}
                                        sort={cherry.sort}
                                        imagePath={`/static${cherry.imagePath}`}
                                        price={cherry.price}
                                        description={cherry.description}
                                        isAdmin={isAdmin}>
                                    </Cart>;
                                })}
                            </ul>
                            : <header>
                                <h4>Няма предлагани сортове!</h4>
                            </header>
                        }
                    </Fragment>
                }
            </article>
        </section>
    }
}

export default Menu;