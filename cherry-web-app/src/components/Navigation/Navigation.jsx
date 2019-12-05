import React from 'react';

import { NavLink } from 'react-router-dom';

import UserNav from './UserNav/UserNav';

const Navigation = ({ username, isAdmin }) => {
    return (<nav className="site-navigation">
        <ul>
            <li>
                <NavLink to="/about" activeClassName="selected">Начало</NavLink >

            </li>
            <li>
                <NavLink to="/menu" activeClassName="selected">Меню</NavLink>
            </li>
            <UserNav username={username} isAdmin={isAdmin} />
        </ul>
    </nav>);
}

export default Navigation;