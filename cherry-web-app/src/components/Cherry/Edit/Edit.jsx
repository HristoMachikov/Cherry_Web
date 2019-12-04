import React, { Component } from 'react';
// import './shared/styles/_forms.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        errorMessages: {}
    };

    componentDidMount = () => {
        const { id } = this.props.match.params;
        cherryService.getEdit(id).then(cherry => {
            this.setState({ ...cherry[0], checkBox: cherry[0].isPublic });
        }).catch(err => {
            console.log(err);
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { id } = this.props.match.params;
        
        const { sort, description, imagePath, isPublic, price, _id } = this.state;
        cherryService.postEdit(id, { sort, description, imagePath, isPublic, price, _id }).then(res => {
            if (res === "Успешна промяна!") {
                toast.info(`${res}`, {
                    closeButton: false
                })
                this.props.history.push('/');
            } else {
                toast.error(`${res}`, {
                    closeButton: false
                })
                return null;
            }

        }).catch(err => {
            console.log(err);
        })
    }

    handleFormElementChange = (event) => {
        const { value, id } = event.target;
        const parsedId = camelCased(id);
        if (event.target.type === "checkbox") {
            const { checked } = event.target;
            this.setState({
                [parsedId]: checked,
                isPublic: checked
               
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
          
            this.setState(({ errorMessages }) => ({
               errorMessages: { ...errorMessages, [target.name]: "Моля, попълнете това поле!" }
            }))
        } else {
            this.setState(({ errorMessages }) => ({
                errorMessages: { ...errorMessages, [target.name]: null }
            }))
        }
    }

    render() {
        const { sort, price, imagePath, description, checkBox, errorMessages } = this.state;

        const sortError = errorMessages && errorMessages["sort"];
        const priceError = errorMessages && errorMessages["price"];
        const imagePathError = errorMessages && errorMessages["imagePath"];
        const descriptionError = errorMessages && errorMessages["description"];

        return (
            <section className="contacts">
                <ToastContainer autoClose={3500} />
                <div className="contact-header">
                    <h1>Промени избраният сорт</h1>
                </div>
                <div className="contact-form">
                    <form onSubmit={this.handleSubmit}>
                        <p className="sort">
                            <label htmlFor="sort">Име:<span>*{sortError}</span></label>
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
                            <label htmlFor="price">Цена:<span>*{priceError}</span></label>
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
                            <label htmlFor="image-path">Снимка:<span>*{imagePathError}</span></label>
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
                            <label htmlFor="description">Съобщение:<span>*{descriptionError}</span></label>
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