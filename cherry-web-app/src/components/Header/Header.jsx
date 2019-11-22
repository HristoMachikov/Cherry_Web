import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

function Header({isAdmin, username}) {
    return (<header className="main-header">
        <div className="wrapper">
            <input type="checkbox" name="toggle" id="toggle" className="toggle-nav" />
            <div className="site-header">
                <div className="site-logo">
                    <Link to="/" className="image">
                        <img src="/static/images/Logo.jpg" alt="logo" />
                    </Link>
                    <p className="text">get cherry</p>
                </div>
                <label htmlFor="toggle" className="toggle-nav-btn">
                    <span className="menu"></span>
                </label>
                <Navigation isAdmin={isAdmin} username={username}/>
            </div>
        </div>
    </header>);
}

export default Header;