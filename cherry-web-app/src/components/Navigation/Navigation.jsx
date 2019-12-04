import React from 'react';
import { NavLink } from 'react-router-dom';

import UserNav from './UserNav/UserNav';

class Navigation extends React.Component {

    // componentDidUpdate() {
    //     this.nameLink.focus();
    // }
    render() {
        const { username, isAdmin, history } = this.props;
        return (<nav className="site-navigation">
            <ul>
                <li>
                    <NavLink to="/about" activeClassName="selected">Начало</NavLink >

                </li>
                <li>
                    <NavLink to="/"
                        // ref={(link) => { this.nameLink = link; }} 
                        exact activeClassName="selected">Меню</NavLink>
                </li>
                <UserNav username={username} isAdmin={isAdmin} history={history} />
            </ul>
        </nav>);
    }
}

export default Navigation;