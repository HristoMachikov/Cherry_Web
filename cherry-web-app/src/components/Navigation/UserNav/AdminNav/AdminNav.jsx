import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


function AdminNav({ isAdmin, history }) {

    return isAdmin ? <Fragment>
        <li>
            <NavLink to="/cherry/create" activeClassName="selected">Нов сорт</NavLink>
        </li>
        <li>
            <NavLink to="/admin/pending-orders" activeClassName="selected">Чакащи</NavLink>
        </li>
    </Fragment> : <Fragment>
            <li>
                <NavLink to="/order/my-orders" activeClassName="selected">Поръчани</NavLink>
            </li>
            <li>
                <NavLink to="/order/products" activeClassName="selected">Кошница</NavLink>
            </li>
        </Fragment>
}

AdminNav.propTypes = {
    isAdmin: PropTypes.bool

}
export default AdminNav;