import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withForm from '../../shared/hocs/withForm';
import { ToastContainer, toast } from 'react-toastify';

import * as yup from 'yup'
// import './shared/styles/_forms.scss';

class Login extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         username: "",
    //         password: "",
    //         errorMessages: []
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
    //             errorMessages: [target.validationMessage]
    //         }))
    //     } else {
    //         this.setState(() => ({
    //             errorMessages: []
    //         }))
    //     }
    // }

    usernameOnChangeHandler = this.props.controlChangeHandlerFactory("username");
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory("password");

    submitHandler = (event) => {
        event.preventDefault();
        const errors = this.props.getFormErrorState();
        if (!!errors) { return; }
        const data = this.props.getFormState();
        this.props.setLogin(this.props.history, data)
    }

    getFirstControlError = name => {
        const errorState = this.props.getFormErrorState();
        return errorState && errorState[name] && errorState[name][0];
    };


    render() {
        const usernameError = this.getFirstControlError('username');
        const passwordError = this.getFirstControlError('password');
        // const { username, password, errorMessages } = this.state;
        // const postData = { username, password }
        return (
            <section className="site-section login">
                <ToastContainer />
                {usernameError && <div>{usernameError}</div>}
                {passwordError && <div>{passwordError}</div>}
                {/* {usernameError && toastr.warning(usernameError)} */}

                {/* {errorMessages.length ? <ul>
                    {errorMessages.map((message, idx) => <li key={idx}>{message}</li>)}
                </ul> : null} */}
                {/* <form onSubmit={(e) => this.handleSubmit(e, postData, true, this.props.history)} className="main-form"> */}
                <form onSubmit={this.submitHandler} className="main-form">
                    <fieldset className="main-form-fieldsed">
                        <legend className="main-form-legent">Вход</legend>
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
                            // onBlur={this.checkValidity}
                            // minLength={4}
                            />
                            <span></span>
                        </p>
                        <p className="form-field password last">
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
                            // onBlur={this.checkValidity}
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
    username: yup
        .string()
        .required("Въведете потребителско име!")
        .min(4, "Името трябва да е поне 4 символа!"),

    password: yup
        .string()
        .required("Въведете парола!")
        .min(4, "Паролата трябва да е поне 4 символа!")

});
export default withForm(Login, { username: '', password: '' }, schema);
// export default Login;