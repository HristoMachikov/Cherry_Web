import React, {Component, Fragment} from 'react';
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
        })
    }

    render() {
        const { cherrys } = this.state;

        return cherrys ? <section className="site-section home">
            <article className="sorts" id="sorts">
                {cherrys ? (<Fragment>
                    <header>
                        <h2>Предлагани сортове</h2><span></span>
                    </header>
                    <ul>
                        {cherrys.map((cherry) => {
                            return <Cart
                                key={cherry._id}
                                id={cherry._id}
                                sort={cherry.sort}
                                imagePath={`/static${cherry.imagePath}`}
                                price={cherry.price}
                                description={cherry.description}>
                            </Cart>;
                        })}
                    </ul>
                </Fragment>) : (<header>
                    <h4>Няма предлагани сортове!</h4>
                </header>)}
            </article>
        </section> : <div>Loading...</div>

        // return cherrys ? <div className="Posts">
        //     {cherrys.map((cherry) => {


        //         return <Cart
        //             key={cherry._id}
        //             id={cherry._id}
        //             sort={cherry.sort}
        //             price={cherry.price}
        //             description={cherry.description}>
        //         </Cart>;
        //     })}
        // </div> : <div>Loading...</div>
    }
}

// Menu.PropTypes = {
//     limit: PropTypes.number
// }

export default Menu;