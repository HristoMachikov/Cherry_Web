import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import withForm from '../../shared/hocs/withForm';

import * as yup from 'yup'

import userService from '../../services/user-service';
// import './shared/styles/_forms.scss';

import { minLength, minLengthPhone } from '../../config/app-config';
// import minLengthPhone from '../../config/app-config';


class Register extends Component {

    onChangeHandler = this.props.controlOnChangeHandlerFactory();


    usernameOnChangeHandler = this.props.controlChangeHandlerFactory("username");
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory("password");
    repeatPasswordOnChangeHandler = this.props.controlChangeHandlerFactory("repeatPassword");
    emailOnChangeHandler = this.props.controlChangeHandlerFactory("email");

    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         username: "",
    //         email: "",
    //         password: "",
    //         repeatPassword: "",
    //         errorMessages: null
    //     };

    //     this.handleSubmit = this.props.handleSubmit.bind(this);
    //     this.handleFormElementChange = this.props.handleFormElementChange.bind(this);
    // }

    // checkValidity = (event) => {
    //     const { target } = event;
    //     if (!target.checkValidity()) {
    //         console.error("Something went wrong...")
    //         console.error(target.validationMessage)
    //         this.setState(({ errorMessages }) => ({
    //             errorMessages: [target.runValidations]
    //         }))
    //     } else {
    //         this.setState(() => ({
    //             errorMessages: []
    //         }))
    //     }
    // }
    // runValidations = () => {
    //     schema.validate(this.state, { abortEarly: false }).then(() => {
    //         // this.setState(() => ({
    //         //     errorMessages: []
    //         // }))
    //     }).catch(err => {
    //         console.error("Something went wrong...")
    //         const errors = err.inner.reduce((acc, { path, message }) => {
    //             acc[path] = (acc[path] || []).concat(message);
    //             return acc;
    //         }, {})
    //         console.log(errors)
    //         this.setState({
    //             errorMessages: errors
    //         })
    //     })
    // }

    submitHandler = (event) => {
        event.preventDefault();

        this.props.runValidations()
            .then(formData => {
                console.log(formData)

                const errors = this.props.getFormErrorState();

                const firstError = this.getFirstControlError('username')
                    || this.getFirstControlError('password')
                    || this.getFirstControlError('repeatPassword')
                    || this.getFirstControlError('email')
                    || this.getFirstControlError('phone');

                firstError && toast.warn(firstError, {
                    closeButton: false
                })

                if (!!errors) { return; }
                const data = this.props.getFormState();
                console.log(data)
                return userService.register(data).then((res) => {
                    if (res.username) {
                        toast.success(`Успешна регистрация!`, {
                            closeButton: false
                        })
                        this.props.history.push('/user/login');
                    } else {
                        toast.error(res, {
                            closeButton: false
                        })
                    }
                })
            }).catch(err => {

                console.log(err)
            });
    };

    getFirstControlError = name => {
        const errorState = this.props.getFormErrorState();
        return errorState && errorState[name] && errorState[name][0];
    };

    render() {


        const currentInputName = this.props.getFormState().currentName;
        const currentInputChecked = this.props.getFormState()[currentInputName];

        // const classError = (currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";

        const classErrorUsername = (currentInputName === 'username' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";
        const classErrorPassword = (currentInputName === 'password' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";
        const classErrorRepeatPassword = (currentInputName === 'repeatPassword' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";
        const classErrorEmail = (currentInputName === 'email' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";
        const classErrorPhone = (currentInputName === 'phone' && currentInputChecked && currentInputChecked.length < minLengthPhone) ? " error" : "";

        return (
            <section className="site-section login">
                <ToastContainer autoClose={3500} />

                {/* errorMessages.map((message, idx) => <li key={idx}>{message}</li>) */}
                {/* <form onSubmit={(e) => this.handleSubmit(e, postData, false, this.props.history)} */}

                <form onSubmit={this.submitHandler} className="main-form">
                    <fieldset className="main-form-fieldsed">
                        <legend className="main-form-legent">Регистрация</legend>
                        <p className="form-field username first">
                            <label htmlFor="username">Име</label>
                            <input
                                className={`form-input${classErrorUsername}`}
                                type="text"
                                name="username"
                                id="username"
                                onChange={(e) => this.onChangeHandler(e)}
                            // onChange={this.usernameOnChangeHandler}
                            // ref={this.inputFocus1.ref}
                            // value={username}
                            // onChange={this.handleFormElementChange}
                            // required
                            // onBlur={this.runValidations}
                            />
                            <span></span>
                        </p>
                        <p className="form-field password">
                            <label htmlFor="password">Парола</label>
                            <input
                                className={`form-input${classErrorPassword}`}
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.onChangeHandler}
                            // onChange={this.passwordOnChangeHandler}
                            // ref={this.inputFocus2.ref}
                            // value={password}
                            // onChange={this.handleFormElementChange}
                            // required
                            // onBlur={this.runValidations}
                            />
                            <span></span>
                        </p>
                        <p className="form-field password">
                            <label htmlFor="repeat-password">Повтори Парола</label>
                            <input
                                className={`form-input${classErrorRepeatPassword}`}
                                type="password"
                                name="repeatPassword"
                                id="repeat-password"
                                onChange={this.onChangeHandler}
                            // onChange={this.repeatPasswordOnChangeHandler}

                            // value={repeatPassword}
                            // onChange={this.handleFormElementChange}
                            // required
                            // onBlur={this.runValidations}
                            />
                            <span></span>
                        </p>
                        <p className="form-field email">
                            <label htmlFor="email">E-mail</label>
                            <input
                                className={`form-input${classErrorEmail}`}
                                type="email"
                                name="email"
                                id="email"
                                onChange={this.onChangeHandler}
                            // onChange={this.emailOnChangeHandler}

                            // value={email}
                            // onChange={this.handleFormElementChange}
                            // required
                            // onBlur={this.runValidations}
                            />
                            <span></span>
                        </p>
                        <p className="form-field phone last">
                            <label htmlFor="phone">Телефон</label>
                            <input
                                className={`form-input${classErrorPhone}`}
                                type="phone"
                                name="phone"
                                id="phone"
                                onChange={this.onChangeHandler}
                            // onChange={this.emailOnChangeHandler}

                            // value={email}
                            // onChange={this.handleFormElementChange}
                            // required
                            // onBlur={this.runValidations}
                            />
                            <span></span>
                        </p>
                        <p className="form-btn">
                            <button className="primary-btn" type="submit">Регистрираи се</button>
                        </p>
                        <p className="question">Ако имаш регистрация, избери <Link to="/user/login">Вход</Link>!</p>
                    </fieldset>
                </form>
            </section>
        );
    }
}

const initialFormState = {
    username: '',
    password: '',
    repeatPassword: '',
    email: "",
    phone: ""
};

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Въведете потребителско име!")
        .min(minLength, `Името трябва да е поне ${minLength} символа!`),

    password: yup
        .string()
        .required("Въведете парола!")
        .matches(/^[а-яА-Яa-zA-Z0-9]*[а-яА-Яa-zA-Z0-9]$/, "Паролата трябва да е само с букви и цифри!")
        .min(minLength, `Паролата трябва да е поне ${minLength} символа!`),

    repeatPassword: yup
        .mixed()
        .required("Повторете паролата!")
        .oneOf([yup.ref('password'), null], "Паролите не съвпадат!")
        .notOneOf(['    ', null], "Въведете нова парола!"),
    email: yup
        .string()
        .required("Въведете E-mail!")
        .email("Въведете валиден E-mail!"),
    phone: yup
        .string()
        .required("Въведете телефон за връзка!")
        .min(9, "Телефона трябва да е минимум 9 цифрен!")
});
export default withForm(Register, initialFormState, schema);
// export default Register;
