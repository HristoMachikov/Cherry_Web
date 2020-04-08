import React, { Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';

import AdminNav from './AdminNav/AdminNav';

function UserNav({ username, isAdmin }) {
    return username ? <Fragment>
        <AdminNav isAdmin={isAdmin} />
        <li> <Link>Опции</Link>
            <ul>
                <li>
                    <NavLink to="/user/logout" activeClassName="selected">Изход</NavLink>
                </li>
                <li>
                    <NavLink to="/user/change-password" activeClassName="selected">Смени парола</NavLink>
                </li>
            </ul>
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