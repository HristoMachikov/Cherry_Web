import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import withForm from '../../shared/hocs/withForm';

import * as yup from 'yup'
// import './shared/styles/_forms.scss';

// const camelCased = myString => (
//     myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
// );


class Register extends Component {

    // userOnChangeHandler = this.props.controlChangeHandlerFactory("username");
    // passwordOnChangeHandler = this.props.controlChangeHandlerFactory("password");
    // repeatPasswordOnChangeHandler = this.props.controlChangeHandlerFactory(" repeatPassword");
    // emailOnChangeHandler = this.props.controlChangeHandlerFactory("email");

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            errorMessages: null
        };

        this.handleSubmit = this.props.handleSubmit.bind(this);
        this.handleFormElementChange = this.props.handleFormElementChange.bind(this);

    }


    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     console.dir(this.state);
    // }

    // handleFormElementChange = (event) => {
    //     const { value, id } = event.target;
    //     const parsedId = camelCased(id);
    //     this.setState({
    //         [parsedId]: value
    //     })
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
    runValidations = () => {
        schema.validate(this.state, { abortEarly: false }).then(() => {
            // this.setState(() => ({
            //     errorMessages: []
            // }))
        }).catch(err => {
            console.error("Something went wrong...")
            const errors = err.inner.reduce((acc, { path, message }) => {
                acc[path] = (acc[path] || []).concat(message);
                return acc;
            }, {})
            console.log(errors)
            this.setState({
                errorMessages: errors
            })
        })
    }

    render() {
        const { username, password, repeatPassword, email, errorMessages } = this.state;
        const postData = { username, password, repeatPassword, email }
        const errorMessage = errorMessages
            && (errorMessages["username"] && errorMessages["username"][0])
            && (errorMessages["password"] && errorMessages["password"][0])
            && (errorMessages["repeatPassword"] && errorMessages["repeatPassword"][0])
            && (errorMessages["email"] && errorMessages["email"][0]);
            console.log(errorMessage)
    
        return (
            <section className="site-section login">
                {
                    errorMessage ?

                        // errorMessages.map((message, idx) => <li key={idx}>{message}</li>)
                        <div>{errorMessage}</div>

                        : null
                }
                <form onSubmit={(e) => this.handleSubmit(e, postData, false, this.props.history)}

                    className="main-form">
                    <fieldset className="main-form-fieldsed">
                        <legend className="main-form-legent">Регистрация</legend>
                        <p className="form-field username">
                            <label htmlFor="username">Име</label>
                            <input
                                className="form-input"
                                type="text"
                                name="username"
                                id="username"
                                value={username}
                                onChange={this.handleFormElementChange}
                                // required
                                onBlur={this.runValidations}
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
                                value={password}
                                onChange={this.handleFormElementChange}
                                // required
                                onBlur={this.runValidations}
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
                                value={repeatPassword}
                                onChange={this.handleFormElementChange}
                                // required
                                onBlur={this.runValidations}
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
                                value={email}
                                onChange={this.handleFormElementChange}
                                // required
                                onBlur={this.runValidations}
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

const schema = yup.object().shape({
    username: yup
        .string()
        .required("Въведете потребителско име!")
        .min(4, "Името трябва да е поне 4 символа!"),

    password: yup
        .string()
        .required("Въведете парола!")
        .min(4, "Паролата трябва да е поне 4 символа!"),

    repeatePassword: yup
        .string()
        .oneOf([yup.ref('password')], "Паролите не съвпадат!")
        .required("Повторете паролата!")
        .min(4, "Паролата трябва да е минимум 4 символа!")

});
// export default withForm(Register,schema);
export default Register;
