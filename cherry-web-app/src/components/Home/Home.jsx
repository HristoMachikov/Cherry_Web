import React, { Component, Fragment } from 'react';

import CartHome from './CartHome/CartHome';
import SideNav from './SideNav/SideNav';
import Info from './Info/Info';
import Why from './Why/Why';
import Order from './Order/Order';
import Contacts from './Contacts/Contacts';
import Location from './Location/Location';

import cherryService from '../../services/cherry-service'

class Home extends Component {
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
                        {cherrys.length ?
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
            <Contacts />
            <Location />
        </section>
    }
}

export default Home;