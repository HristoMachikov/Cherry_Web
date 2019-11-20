import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import './shared/styles/_forms.scss';

import cherryService from '../../../services/cherry-service';

const camelCased = myString => (
    myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
);

class Edit extends Component {
    state = {
        sort: "",
        price: "",
        imagePath: "",
        description: "",
        isPublic: false,
        checkBox: false,
        errorMessages: []
    };

    componentDidMount = () => {
        const { id } = this.props.match.params;
        cherryService.getEdit(id).then(cherry => {
            this.setState({ ...cherry[0], checkBox: !this.state.isPublic });
        }).catch(err => {
            console.log(err);
        })
    }

    handleCreate = (event) => {
        event.preventDefault();
        const { id } = this.props.match.params;
        const { sort, description, imagePath, isPublic, price, _id } = this.state;
        cherryService.postEdit(id, { sort, description, imagePath, isPublic, price, _id }).then(res => {
            console.log(res);
            <Redirect to="/" />
        }).catch(err => {
            console.log(err);
        })
        console.dir(this.state);
    }

    handleFormElementChange = (event) => {
        const { value, id } = event.target;
        const parsedId = camelCased(id);
        if (event.target.type === "checkbox") {
            const { checked } = event.target;
            this.setState({
                [parsedId]: checked,
                isPublic: !this.state.checkBox
            })
            return;
        }
        this.setState({
            [parsedId]: value
        })
    }

    checkValidity = (event) => {
        const { target } = event;
        if (!target.checkValidity()) {
            console.error("Something went wrong...")
            console.dir(target)
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
                    <h1>Промени избраният сорт</h1>
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
                        <div className="check-box">
                            <label htmlFor="check-box">Да се публикува</label>
                            <input
                                type="checkbox"
                                id="check-box"
                                name="checkBox"
                                checked={checkBox}
                                onChange={this.handleFormElementChange}
                            />
                        </div>
                        <div className="form-btn">
                            <p className="btn">
                                <button type="submit" className="primary-btn">Промени</button>
                            </p>
                        </div>
                    </form>
                </div>
            </section >
        );
    }

}

export default Edit;