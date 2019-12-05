import React from 'react';

import PropTypes from 'prop-types';

function CartHome({ imagePath, sort }) {
    return (<li className="site-section-inner">
        <p className="imges">
            <img src={imagePath} alt={imagePath} />
        </p>
        <p className="header"></p>
        <h3>{sort}</h3>
    </li>);
}

CartHome.propTypes = {
    id: PropTypes.string,
    imagePath: PropTypes.string,
    sort: PropTypes.string,
}

export default CartHome;