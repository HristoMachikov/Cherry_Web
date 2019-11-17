import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


function AdminNav({ isAdmin }) {
    
    return  isAdmin  ? <Fragment>
        <li>
            <Link to="/cherry/create">Нов сорт</Link>
        </li>
        <li>
            <Link to="/admin/pending-orders">Чакащи</Link>
        </li>
    </Fragment> : <Fragment>
        <li>
            <Link to="/order/my-orders">Поръчани</Link>
        </li>
        <li>
            <Link to="/user/current-state">Кошница</Link>
        </li>
    </Fragment>
}

AdminNav.propTypes = {
    isAdmin: PropTypes.bool

}
export default AdminNav;