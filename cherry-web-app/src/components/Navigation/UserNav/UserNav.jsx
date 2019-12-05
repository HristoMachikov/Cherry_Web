import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import AdminNav from './AdminNav/AdminNav';

function UserNav({ username, isAdmin }) {
    return username ? <Fragment>
        <AdminNav isAdmin={isAdmin} />
        <li>
            <NavLink to="/user/logout" activeClassName="selected">Изход</NavLink>
        </li>
    </Fragment> : <Fragment>
            <li>
                <NavLink to="/user/register" activeClassName="selected">Регистрация</NavLink>
            </li>
            <li>
                <NavLink to="/user/login" activeClassName="selected">Вход</NavLink>
            </li>
        </Fragment>
}

export default UserNav;