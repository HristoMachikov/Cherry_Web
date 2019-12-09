import React from 'react';

function Location() {
    return (<article className="location" id="location">
    <header className="location-header">
        <h2>Местоположение</h2><span></span>
    </header>
    <div className="location-wrapper">
        <p className="location-text">Местоположение на овощните градини:</p>
        <div className="iframe">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56129.40312896641!2d22.724569926384948!3d42.32251329362624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14aa99bdb764e7ef%3A0xa00a014cd0e6ef0!2zMjU0MCDQmtC-0L3Rj9Cy0L4!5e0!3m2!1sbg!2sbg!4v1565009839311!5m2!1sbg!2sbg" title="map" width="400" height="300" frameBorder="0" allowFullScreen=""></iframe>
        </div>
    </div>
</article>);
}

export default Location;