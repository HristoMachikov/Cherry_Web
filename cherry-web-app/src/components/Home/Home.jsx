import React, { Component, Fragment } from 'react';

import CartHome from './CartHome/CartHome';

import cherryService from '../../services/cherry-service'

class Home extends Component {
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
                                    return <CartHome
                                        key={cherry._id}
                                        sort={cherry.sort}
                                        imagePath={`/static${cherry.imagePath}`}>
                                    </CartHome>;
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

export default Home;