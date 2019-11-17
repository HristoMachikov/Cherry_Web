import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


import AdminNav from './AdminNav/AdminNav';

class UserNav extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: 1,
            isAdmin: false
        }
    }

    render() {
        const { user, isAdmin } = this.state;
        return user ? <Fragment>
            <AdminNav isAdmin={isAdmin} />
            <li>
                <Link to="/user/logout">Изход</Link>
                {/* <form id="logout-form" action="/user/logout" method="post"></form>
                        <Link to="javascript:document.getElementById('logout-form').submit()">
                            Изход
                        </Link> */}
            </li>
        </Fragment> : <Fragment>
                <li>
                    <Link to="/user/register">Регистрация</Link>
                </li>
                <li>
                    <Link to="/user/login">Вход</Link>
                </li>
            </Fragment>
    }
}


export default UserNav;