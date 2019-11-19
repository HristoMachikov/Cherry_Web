import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './shared/styles/_forms.scss';

const camelCased = myString => (
    myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
);

class Create extends Component {
    state = {
        sort: "",
        price: "",
        imagePath: "",
        description: "",
        checkBox: "",
        isPublic: true,
        errorMessages: []
    };

    handleCreate = (event) => {
        event.preventDefault();
        console.dir(this.state);
    }

    handleFormElementChange = (event) => {
        const { value, id } = event.target;
        const parsedId = camelCased(id);
        this.setState({
            [parsedId]: value
        })
    }

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
        const { sort, price, imagePath, description, checkBox, errorMessages, isPublic } = this.state;
        return (
            <section className="contacts">
                <div className="contact-header">
                    <h1>Създай нов сорт</h1>
                </div>
                {
                    errorMessages.length ? <ul>
                        {
                            errorMessages.map((message, idx) => <li key={idx}>{message}</li>)
                        }
                    </ul> : null
                }
                <div className="contact-form">
                    <form onSubmit={this.handleCreate}
                    // action='/cherry/create'
                    // method="POST"
                    >

                        <p className="sort">
                            <label htmlFor="sort">Име:<span>*</span></label>
                            <input
                                type="text"
                                name="sort"
                                id="sort"
                                placeholder="Type cherry sort here"
                                value={sort}
                                onChange={this.handleFormElementChange}
                                required
                                onBlur={this.checkValidity}
                            />
                        </p>
                        <p className="price">
                            <label htmlFor="price">Цена:<span>*</span></label>
                            <input
                                type="text"
                                name="price"
                                id="price"
                                placeholder="Type price per 1 kilogram"
                                value={price}
                                onChange={this.handleFormElementChange}
                                required
                                onBlur={this.checkValidity}
                            />
                        </p>
                        <p className="imagePath">
                            <label htmlFor="image-path">Снимка:<span>*</span></label>
                            <input
                                type="text"
                                name="imagePath"
                                id="image-path"
                                placeholder="Type image path"
                                value={imagePath}
                                onChange={this.handleFormElementChange}
                                required
                                onBlur={this.checkValidity}
                            />
                        </p>
                        <p className="description">
                            <label htmlFor="description">Съобщение:<span>*</span></label>
                            <textarea
                                name="description"
                                id="description"
                                rows="5"
                                placeholder="Type some description..."
                                value={description}
                                onChange={this.handleFormElementChange}
                                required
                                onBlur={this.checkValidity}

                            />
                        </p>
                        <p className="check-box">
                            <label htmlFor="check-box">Public</label>
                            <input
                                type="checkbox"
                                className="checkbox"
                                id="check-box"
                                name="checkBox"
                            // {isPublic ? "checked" : ""} 
                            />
                        </p>
                        <div className="form-btn">
                            <p className="btn">
                                <button type="submit" className="primary-btn">Създай</button>
                            </p>
                        </div>


                        {/* <fieldset className="main-form-fieldsed">
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
                        </fieldset> */}
                    </form>
                </div>
            </section >
        );
    }

}

export default Create;