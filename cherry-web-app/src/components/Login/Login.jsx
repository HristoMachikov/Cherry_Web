import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './shared/styles/_forms.scss';

// const camelCased = myString => (
//     myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
// );

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
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
        const { username, password, errorMessages } = this.state;

        const resData = { username, password }
        return (
            <section className="site-section login">
                {
                    errorMessages.length ? <ul>
                        {
                            errorMessages.map((message, idx) => <li key={idx}>{message}</li>)
                        }
                    </ul> : null
                }
                <form onSubmit={(e) => this.handleSubmit(e, resData)}
                    // action='/user/login'
                    // method="POST"
                    className="main-form">
                    <fieldset className="main-form-fieldsed">
                        <legend className="main-form-legent">Вход</legend>
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
                        <p className="form-field password last">
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

export default Login;