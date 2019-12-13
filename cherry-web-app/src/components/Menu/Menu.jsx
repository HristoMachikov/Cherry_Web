import React, { Fragment, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import Cart from './Cart/Cart';

import cherryService from '../../services/cherry-service'

function Menu(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [cherrys, setCherrys] = useState([]);
    const { isAdmin } = props;

    useEffect(() => {
        const { isAdmin } = props;
        (isAdmin ?
            cherryService.getProductsAdmin().then(cherrys => {
                const isLoading = false;
                setCherrys(cherrys);
                setIsLoading(isLoading);
            }).catch(err => {
                console.log(err);
            }) :
            cherryService.getProducts().then(cherrys => {
                const isLoading = false;
                setCherrys(cherrys);
                setIsLoading(isLoading);
            }).catch(err => {
                console.log(err);
            })
        )
    }, []);
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
                    {cherrys && cherrys.length ?
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

export default Menu;