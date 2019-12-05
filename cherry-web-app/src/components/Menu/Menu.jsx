import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';

import Cart from './Cart/Cart';

// import posts from '../../data/posts.json';

import cherryService from '../../services/cherry-service'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cherrys: null
        };
    }
    componentDidMount() {
        cherryService.load().then(cherrys => {
            console.log(cherrys);
            this.setState({ cherrys });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { cherrys } = this.state;
        const { isAdmin } = this.props;
        console.log(this.props.location);
        return <section className="site-section home">
            {cherrys ? <article className="sorts" id="sorts">
                {cherrys.length
                    ? <Fragment>
                        <header>
                            <h2>Предлагани сортове</h2><span></span>
                        </header>
                        <ul>
                            {cherrys.map((cherry) => {
                                if (!cherry.isPublic && !isAdmin) {
                                    return null;
                                } else {
                                    return <Cart
                                        key={cherry._id}
                                        id={cherry._id}
                                        sort={cherry.sort}
                                        imagePath={`/static${cherry.imagePath}`}
                                        price={cherry.price}
                                        description={cherry.description}
                                        isAdmin={isAdmin}>
                                    </Cart>;
                                }
                            })}
                        </ul>
                    </Fragment>
                    : <header>
                        <h4>Няма предлагани сортове!</h4>
                    </header>
                }
            </article>
                : <article className="sorts" id="sorts" >
                    <header><h2>Loading...</h2></header>
                </article>
            }
        </section>
    }
}

export default Menu;