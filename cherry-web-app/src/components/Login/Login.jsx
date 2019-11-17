import React from 'react';
import { Link } from 'react-router-dom';
// import './shared/styles/_forms.scss';

function Login() {
    return (
        <section className="ite-section login">
            <form action="#" className="main-form">
                <fieldset className="main-form-fieldsed">
                    <legend className="main-form-legent">Вход</legend>
                    <p className="form-field username">
                        <label for="username">Име</label>
                        <input className="form-input" type="text" name="username" id="username" />
                        <span></span>
                    </p>
                    <p className="form-field password last">
                        <label for="password">Парола</label>
                        <input className="form-input" type="password" name="password" id="password" />
                        <span></span>
                    </p>
                    <p className="form-btn">
                        <a className="primary-btn" href="/Cherry_Jekyll">Вход</a>
                    </p>
                    <p className="question">Имаш ли <a href="/Cherry_Jekyll/registration/">Регистрация</a>?</p>
                </fieldset>
            </form>
        </section>
    );
}

export default Login;