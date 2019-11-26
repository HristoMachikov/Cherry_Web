import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withForm from '../../shared/hocs/withForm';

import * as yup from 'yup'

import userService from '../../services/user-service';
// import './shared/styles/_forms.scss';

class Register extends Component {

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
        // this.props.runValidations()
        //   .then(formData => console.log(formData));
        const errors = this.props.getFormErrorState();
        console.log(errors)
        if (!!errors) { return; }
        const data = this.props.getFormState();
        userService.register(data).then(() => {
            this.props.history.push('/user/login');
        });
    };

    getFirstControlError = name => {
        const errorState = this.props.getFormErrorState();
        return errorState && errorState[name] && errorState[name][0];
    };

    render() {
        const usernameError = this.getFirstControlError('username');
        const passwordError = this.getFirstControlError('password');
        const repeatPasswordError = this.getFirstControlError('repeatPassword');
        const emailError = this.getFirstControlError('email');

        return (
            <section className="site-section login">
                {usernameError && <div>{usernameError}</div>}
                {passwordError && <div>{passwordError}</div>}
                {repeatPasswordError && <div>{repeatPasswordError}</div>}
                {emailError && <div>{emailError}</div>}
                {/* errorMessages.map((message, idx) => <li key={idx}>{message}</li>) */}
                {/* <form onSubmit={(e) => this.handleSubmit(e, postData, false, this.props.history)} */}

                <form onSubmit={this.submitHandler} className="main-form">
                    <fieldset className="main-form-fieldsed">
                        <legend className="main-form-legent">Регистрация</legend>
                        <p className="form-field username">
                            <label htmlFor="username">Име</label>
                            <input
                                className="form-input"
                                type="text"
                                name="username"
                                id="username"
                                onChange={this.usernameOnChangeHandler}
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
                                className="form-input"
                                type="password"
                                name="password"
                                id="password"
                                onChange={this.passwordOnChangeHandler}
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
                                className="form-input"
                                type="password"
                                name="repeatPassword"
                                id="repeat-password"
                                onChange={this.repeatPasswordOnChangeHandler}
                            // value={repeatPassword}
                            // onChange={this.handleFormElementChange}
                            // required
                            // onBlur={this.runValidations}
                            />
                            <span></span>
                        </p>
                        <p className="form-field email last">
                            <label htmlFor="email">E-mail</label>
                            <input
                                className="form-input"
                                type="email"
                                name="email"
                                id="email"
                                onChange={this.emailOnChangeHandler}
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
    rePassword: ''
};

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Въведете потребителско име!")
        .min(4, "Името трябва да е поне 4 символа!"),

    password: yup
        .string()
        .required("Въведете парола!")
        .min(4, "Паролата трябва да е поне 4 символа!"),

    repeatPassword: yup
        .string()
        // .oneOf([yup.ref('password'), null], "Паролите не съвпадат!")
        .required("Повторете паролата!")
        .min(4, "Паролата трябва да е поне 4 символа!"),
    email: yup
        .string()
        .required("Въведете email!")
        // .min(4, "Паролата трябва да е минимум 4 символа!")
        // .isType()


});
export default withForm(Register, initialFormState, schema);
// export default Register;
