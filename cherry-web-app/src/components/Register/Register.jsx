import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './shared/styles/_forms.scss';

// const camelCased = myString => (
//     myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
// );

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: "",
            email: "",
            password: "",
            repeatPassword: "",
            errorMessages: []
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

    checkValidity = (event) => {
        const { target } = event;
        if (!target.checkValidity()) {
            console.error("Something went wrong...")
            console.error(target.validationMessage)
            this.setState(({ errorMessages }) => ({
                errorMessages: [target.validationMessage]
            }))
        } else {
            this.setState(() => ({
                errorMessages: []
            }))
        }
    }

    render() {
        const { username, password, repeatPassword, email, errorMessages } = this.state;
        const postData = { username, password, repeatPassword, email }
        return (
            <section className="site-section login">
                {
                    errorMessages.length ? <ul>
                        {
                            errorMessages.map((message, idx) => <li key={idx}>{message}</li>)
                        }
                    </ul> : null
                }
                <form onSubmit={(e) => this.handleSubmit(e, postData, false)}
                    // action='/user/register'
                    // method="POST"
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
                                required
                                onBlur={this.checkValidity}
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
                                required
                                onBlur={this.checkValidity}
                            />
                            <span></span>
                        </p>
                        <p className="form-field password">
                            <label htmlFor="password">Повтори Парола</label>
                            <input
                                className="form-input"
                                type="password"
                                name="repeatPassword"
                                id="repeat-password"
                                value={repeatPassword}
                                onChange={this.handleFormElementChange}
                                required
                                onBlur={this.checkValidity}
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
                                required
                                onBlur={this.checkValidity}
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

export default Register;