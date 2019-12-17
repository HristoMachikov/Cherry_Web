import React from 'react';

import userService from '../../../services/user-service';
// import PropTypes from 'prop-types';

function Contacts() {

    const submitHandler = React.useCallback(() => {
        console.log('hi!')
   
        userService.sendEmail()
            .then(data => {
                // setLogin(history, data).catch(error => {
                    // if (typeof error === 'object') { throw error; }
                    // setServerError(error);
                    console.log(data);
                    // toast.error(serverError, {
                    //     closeButton: false
                    // })
                // });

            }).catch(errors => {
                // if (errors.email) { emailFormControl.setErrors(errors.email); }
                // if (errors.password) { passwordFormControl.setErrors(errors.password); }

                // const getFirstEmailFormControlError = emailFormControl.errors && emailFormControl.errors[0];

                // const getFirstPasswordFormControlError = passwordFormControl.errors && passwordFormControl.errors[0];

                console.log(errors)
                // console.log(passwordFormControl.errors)

                // const firstError = getFirstEmailFormControlError || getFirstPasswordFormControlError

                // firstError && toast.warn(firstError, {
                //     closeButton: false
                // })
            })
    }, []);


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
                        <button className="primary-btn" type="button" onClick={submitHandler}>Изпрати</button>
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