import React, { Fragment, useState, useEffect } from 'react';

import CartHome from './CartHome/CartHome';
import SideNav from './SideNav/SideNav';
import Info from './Info/Info';
import Why from './Why/Why';
import Order from './Order/Order';
import Contacts from './Contacts/Contacts';
import Location from './Location/Location';

import cherryService from '../../services/cherry-service'

function Home(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [cherrys, setCherrys] = useState([]);

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
        <SideNav />
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
                                return <CartHome
                                    key={cherry._id}
                                    sort={cherry.sort}
                                    imagePath={`/static${cherry.imagePath}`}>
                                </CartHome>;
                            })}
                        </ul>
                        : <header>
                            <h4>Няма предлагани сортове!</h4>
                        </header>
                    }
                </Fragment>
            }
        </article>
        <Info />
        <Why />
        <Order />
        <Contacts history={props.history} />
        <Location />
    </section>
}

export default Home;