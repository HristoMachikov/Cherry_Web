import React from 'react';

import '../NotFound/page-not-found.scss'

const NotFound = () => {
    return (<section className="site-section home" >
        <article className="not-found" id="not-found">
            <header>
                <h2>404 Page Not Found</h2><span></span>
            </header>
            <p className="imаges">
                <img src="https://imageog.flaticon.com/icons/png/512/42/42901.png" alt="404" />
            </p>
        </article>
    </section>);
}

export default NotFound;