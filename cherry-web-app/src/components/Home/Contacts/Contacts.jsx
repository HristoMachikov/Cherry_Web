import React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import ContactForm from './ContactForm/ContactForm';

function Contacts({ history }) {

    return (<article className="contacts" id="contacts">
        <header className="contact-header">
            <h2>Контакти</h2><span></span>
        </header>
        <div className="contact-card">
            <div className="card-img">
                <img src="/static/card-img.jpg" alt="card-img" />
            </div>
            <div className="card-name">
                <p className="name">Христо Мачиков</p>
            </div>
            <ul className="contact-text">
                <li>
                    <p className="phone">Телефон:<a href="tel:+359 888 002 063">+359 888 002 063</a></p>
                </li>
                <li>
                    <p className="email">E-mail:<a href="mailto:hristomachikov@gmail.com">hristomachikov@gmail.com</a></p>
                </li>
                <li>
                    <p className="address">1172, гр. София, ж.к. Дианабад, бл. 37</p>
                </li>
            </ul>
        </div>
        <GoogleReCaptchaProvider
            reCaptchaKey="6LfRJeMUAAAAAJFJCI5NUmLfkaS_XWr7JvdDQnmL"
            language="bg">
            <ContactForm history={history} />
        </GoogleReCaptchaProvider>
    </article>);
}

export default Contacts;