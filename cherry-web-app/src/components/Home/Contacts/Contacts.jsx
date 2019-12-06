import React from 'react';

// import PropTypes from 'prop-types';

function Contacts() {
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

        <div className="contact-form">
            <form>
                <div className="title">
                    <h6>Изпратете запитване</h6>
                </div>
                <div className="name">
                    <p className="firstname">
                        <label htmlFor="firstname">Име:<span>*</span></label>
                        <input type="text" name="firstname" id="firstname" />
                        <span>Име</span>
                    </p>
                    <p className="lastname">
                        <label htmlFor="lastname">Фамилия:<span>*</span></label>
                        <input type="text" name="lastname" id="lastname" />
                        <span>Фамилия</span>
                    </p>
                </div>
                <p className="email">
                    <label htmlFor="email">E-mail:<span>*</span></label>
                    <input type="email" name="email" id="email" />
                </p>
                <p className="theme">
                    <label htmlFor="theme">Тема:<span>*</span></label>
                    <input type="text" name="theme" id="theme" />
                </p>
                <p className="message">
                    <label htmlFor="message">Съобщение:<span>*</span></label>
                    <textarea name="message" id="message" rows="5"></textarea>
                </p>
                <div className="form-btn">
                    <p className="btn">
                        <a className="primary-btn" href="/">Изпрати</a>
                    </p>
                    <p className="btn">
                        <a className="primary-btn" href="/">Изчисти</a>
                    </p>
                </div>

            </form>
        </div>
    </article>);
}

// CartHome.propTypes = {
//     id: PropTypes.string,
//     imagePath: PropTypes.string,
//     sort: PropTypes.string,
// }

export default Contacts;