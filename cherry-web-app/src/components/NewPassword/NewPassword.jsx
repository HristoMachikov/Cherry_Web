import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReCAPTCHA from "react-google-recaptcha";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../shared/styles/toast-position.scss';

import withForm from '../../shared/hocs/withForm';

import * as yup from 'yup'

import userService from '../../services/user-service';

import { minLength, minReCaptchaWidth, reCaptchaSiteKey } from '../../config/app-config';

const toastProps = { closeButton: false, className: 'toast-position' };

class NewPassword extends Component {
    //
    state = {
        windowInnerWidth: window.innerWidth,
    };
    componentDidMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions = () => {
        this.setState({ windowInnerWidth: window.innerWidth });
    }
    //
    recaptchaRef = React.createRef();

    onChangeHandler = this.props.controlOnChangeHandlerFactory();

    submitHandler = (event) => {
        event.preventDefault();

        this.props.runValidations()
            .then(formData => {
                const errors = this.props.getFormErrorState();

                const firstError = this.getFirstControlError('email')
                    || this.getFirstControlError('newPassword')
                    || this.getFirstControlError('repeatNewPassword');

                firstError && toast.warn(firstError, toastProps)

                if (!!errors) { return; }
                const data = this.props.getFormState();

                const recaptchaValue = this.recaptchaRef.current.getValue();
                return recaptchaValue && userService.setNewPassword(data).then((res) => {
                    if (res && res.ok) {
                        toast.warn(`Потвърдете на посочения E-mail, до 15 минути!`, toastProps)
                        this.props.history.push('/user/login');
                    } else {
                        toast.error(res, toastProps)
                    }
                })
            }).catch(err => console.log(err));
    };

    getFirstControlError = name => {
        const errorState = this.props.getFormErrorState();
        return errorState && errorState[name] && errorState[name][0];
    };

    render() {

        const currentInputName = this.props.getFormState().currentName;
        const currentInputChecked = this.props.getFormState()[currentInputName];

        const classErrorNewPassword = (currentInputName === 'newPassword' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";
        const classErrorRepeatNewPassword = (currentInputName === 'repeatNewPassword' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";
        const classErrorEmail = (currentInputName === 'email' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";

        return (
            <section className="site-section login">
                <ToastContainer autoClose={3500} />

                <form onSubmit={this.submitHandler} className="main-form">
                    <fieldset className="main-form-fieldsed">
                        <legend className="main-form-legent">Вход - нова парола</legend>

                        <p className="form-field email first">
                            <label htmlFor="email">E-mail</label>
                            <input
                                className={`form-input${classErrorEmail}`}
                                type="email"
                                name="email"
                                id="email"
                                onChange={this.onChangeHandler}
                            />
                            <span></span>
                        </p>
                        <p className="form-field password">
                            <label htmlFor="new-password">Нова парола</label>
                            <input
                                className={`form-input${classErrorNewPassword}`}
                                type="password"
                                name="newPassword"
                                id="new-password"
                                onChange={this.onChangeHandler}
                            />
                            <span></span>
                        </p>
                        <p className="form-field password last">
                            <label htmlFor="repeat-new-password">Повтори новата парола</label>
                            <input
                                className={`form-input${classErrorRepeatNewPassword}`}
                                type="password"
                                name="repeatNewPassword"
                                id="repeat-new-password"
                                onChange={this.onChangeHandler}
                            />
                            <span></span>
                        </p>
                        <p className="form-recaptcha">
                            <ReCAPTCHA
                                ref={this.recaptchaRef}
                                sitekey={reCaptchaSiteKey}
                                size={this.state.windowInnerWidth < minReCaptchaWidth ? "compact" : "normal"}
                                hl={"bg"}
                            />
                        </p>

                        <p className="form-btn">
                            <button className="primary-btn" type="button" onClick={() => this.props.history.push('/user/login')}>Назад</button>
                            <button className="primary-btn" type="submit">Нова парола</button>
                        </p>
                        <p className="question">Имаш ли <Link to="/user/register">Регистрация</Link>?</p>
                    </fieldset>
                </form>
            </section>
        );
    }
}

const initialFormState = {
    email: "",
    newPassword: '',
    repeatNewPassword: ''
};

const schema = yup.object().shape({

    email: yup
        .string()
        .required("Въведете E-mail!")
        .email("Въведете валиден E-mail!"),
    newPassword: yup
        .string()
        .required("Въведете новата парола!")
        .matches(/^[а-яА-Яa-zA-Z0-9]*[а-яА-Яa-zA-Z0-9]$/, "Паролата трябва да е само с букви и цифри!")
        .min(minLength, `Паролата трябва да е поне ${minLength} символа!`),

    repeatNewPassword: yup
        .mixed()
        .required("Повторете новата парола!")
        .oneOf([yup.ref('newPassword'), null], "Паролите не съвпадат!")
        .notOneOf(['    ', null], "Въведете друга парола!"),

});
export default withForm(NewPassword, initialFormState, schema);