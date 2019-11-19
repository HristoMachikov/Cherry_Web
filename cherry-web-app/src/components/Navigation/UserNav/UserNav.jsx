import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';


import AdminNav from './AdminNav/AdminNav';

class UserNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: 1,
            isAdmin: true
        }
    }

    render() {
        const { user, isAdmin } = this.state;
        return user ? <Fragment>
            <AdminNav isAdmin={isAdmin} />
            <li>
                <NavLink to="/user/logout" activeClassName="selected">Изход</NavLink>
                {/* <form id="logout-form" action="/user/logout" method="post"></form>
                        <Link to="javascript:document.getElementById('logout-form').submit()">
                            Изход
                        </Link> */}
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
}


export default UserNav;