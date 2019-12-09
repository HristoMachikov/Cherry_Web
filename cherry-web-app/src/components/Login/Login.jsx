import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withForm from '../../shared/hocs/withForm';
import { ToastContainer, toast } from 'react-toastify';

import * as yup from 'yup'

import { minLength } from '../../config/app-config';

class Login extends Component {

    onChangeHandler = this.props.controlOnChangeHandlerFactory();

    emailOnChangeHandler = this.props.controlChangeHandlerFactory("email");
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory("password");

    submitHandler = (event) => {
        event.preventDefault();

        this.props.runValidations()
        .then(formData => {
            const errors = this.props.getFormErrorState();

            const firstError = this.getFirstControlError('email')
                || this.getFirstControlError('password')

            firstError && toast.warn(firstError, {
                closeButton: false
            })

            if (!!errors) { return; }
            const data = this.props.getFormState();
            this.props.setLogin(this.props.history, data);
        }).catch(err => {
            console.log(err)
        });
    }

    getFirstControlError = name => {
        const errorState = this.props.getFormErrorState();
        return errorState && errorState[name] && errorState[name][0];
    };

    render() {
        const currentInputName = this.props.getFormState().currentName;
        const currentInputChecked = this.props.getFormState()[currentInputName];

        const classErrorEmail = (currentInputName === 'email' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";
        const classErrorPassword = (currentInputName === 'password' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";

        return (
            <section className="site-section login">
                <ToastContainer autoClose={3500}/>

                <form onSubmit={this.submitHandler} className="main-form">
                    <fieldset className="main-form-fieldsed">
                        <legend className="main-form-legent">Вход</legend>
                        <p className="form-field email first">
                            <label htmlFor="email">E-mail</label>
                            <input
                                className={`form-input${classErrorEmail}`}
                                type="text"
                                name="email"
                                id="email"
                                onChange={this.onChangeHandler}
                            />
                            <span></span>
                        </p>
                        <p className="form-field password last">
                            <label htmlFor="password">Парола</label>
                            <input
                                className={`form-input${classErrorPassword}`}
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onChangeHandler}
                            />
                            <span></span>
                        </p>
                        <p className="form-btn">
                            <button className="primary-btn" type="submit">Вход</button>
                        </p>
                        <p className="question">Имаш ли <Link to="/user/register">Регистрация</Link>?</p>
                    </fieldset>
                </form>
            </section>
        );
    }
}

const schema = yup.object().shape({
    password: yup
        .string()
        .required("Въведете парола!")
        .matches(/^[а-яА-Яa-zA-Z0-9]*[а-яА-Яa-zA-Z0-9]$/, "Паролата трябва да е само с букви и цифри!")
        .min(minLength, `Паролата трябва да е поне ${minLength} символа!`),
    email: yup
        .string()
        .required("Въведете E-mail!")
        .email("Въведете валиден E-mail!")

});
export default withForm(Login, { email: '', password: '' }, schema);