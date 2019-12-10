import React from 'react';

import { StoreContext } from '../Store/Store';
import { logout } from '../Store/actions';

function Logout() {
    const { dispatch } = React.useContext(StoreContext);
    dispatch(logout());
    // logout(history);
    return null;
}

export default Logout;