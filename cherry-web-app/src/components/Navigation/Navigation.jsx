import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import UserNav from './UserNav/UserNav';

class Navigation extends React.Component {

    componentDidUpdate() {
        this.nameLink.focus();
    }
    render() {
        const { username, isAdmin } = this.props;
        return (<nav className="site-navigation">
            <ul>
                <li>
                    <NavLink to="/about" activeClassName="selected">
                        Начало
                </NavLink >

                    {/* <Link to="/about">Начало</Link> */}
                </li>
                <li>
                    <NavLink to="/" ref={(link) => { this.nameLink = link; }} exact activeClassName="selected">Меню</NavLink>
                </li>
                <UserNav username={username} isAdmin={isAdmin} />
            </ul>
        </nav>);
    }
}

export default Navigation;

// return (<nav className="site-navigation">
//         <ul>
//             <li>
//                 <Link to="/about">Начало</Link>
//             </li>
//             <li>
//                 <Link to="/">Меню</Link>
//             </li>
//             {user}?(
//                 {user.isAdmin}?(
//                     <li>
//                         <Link to="/cherry/create">Нов сорт</Link>
//                     </li>
//                     <li>
//                         <Link to="/admin/pending-orders">Чакащи</Link>
//                     </li>
//                 ):(
//                     <li>
//                         <Link to="/order/my-orders">Поръчани</Link>
//                     </li>
//                     <li>
//                         <Link to="/user/current-state">Кошница</Link>
//                     </li>
//                 )
//                 <li>
//                     <Link to="/user/logout">Изход</Link>
//                     {/* <form id="logout-form" action="/user/logout" method="post"></form>
//                     <Link to="javascript:document.getElementById('logout-form').submit()">
//                         Изход
//                     </Link> */}
//                 </li>
//             ):(
//                 <li>
//                     <Link to="/user/register">Регистрация</Link>
//                 </li>
//                 <li>
//                     <Link to="/user/login">Вход</Link>
//                 </li>
//             )
//         </ul>
//     </nav>);