import React from 'react';

import userService from '../../../services/user-service';
// import PropTypes from 'prop-types';

function Contacts() {

    let [firstname, setFirstname] = React.useState(null);
    let [lastname, setLastname] = React.useState(null);
    let [email, setEmail] = React.useState(null);
    let [theme, setTheme] = React.useState(null);
    let [message, setMessage] = React.useState(null);

    const onChangeNameHandler = (event) => {
        let { name, value } = event.target;
        if (name === "lastname") {
            setLastname(value);
        }
        if (name === "firstname") {
            setFirstname(value);
        }
    }

    const onChangeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const onChangeThemeHandler = (event) => {
        setTheme(event.target.value);
    }

    const onChangeMessageHandler = (event) => {
        setMessage(event.target.value);
    }
    React.useEffect(() => {

    }, [])

    const submitHandler = React.useCallback(() => {
        console.log({ firstname, lastname, email, theme, message })

        userService.sendEmail({ firstname, lastname, email, theme, message })
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
    }, [firstname, lastname, email, theme, message]);

    console.log(firstname, lastname, email, theme, message);
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
                        <input type="text" name="firstname" id="firstname" value={firstname} onChange={onChangeNameHandler} />
                        <span>Име</span>
                    </p>
                    <p className="lastname">
                        <label htmlFor="lastname">Фамилия:<span>*</span></label>
                        <input type="text" name="lastname" id="lastname" value={lastname} onChange={onChangeNameHandler} />
                        <span>Фамилия</span>
                    </p>
                </div>
                <p className="email">
                    <label htmlFor="email">E-mail:<span>*</span></label>
                    <input type="email" name="email" id="email" value={email} onChange={onChangeEmailHandler} />
                </p>
                <p className="theme">
                    <label htmlFor="theme">Тема:<span>*</span></label>
                    <input type="text" name="theme" id="theme" value={theme} onChange={onChangeThemeHandler} />
                </p>
                <p className="message">
                    <label htmlFor="message">Съобщение:<span>*</span></label>
                    <textarea name="message" id="message" rows="5" onChange={onChangeMessageHandler} >{message}</textarea>
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