// /* eslint-disable no-undef */
import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cherryService from '../../../services/cherry-service';

const camelCased = myString => (
    myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
);

// let galleryArr = [];
// const myWidget = cloudinary.createUploadWidget({
//     cloudName: 'deslhiz2y',
//     apiKey: '843597855354654',
//     uploadPreset: 'cherry-web'
// }, (error, result) => {
//     if (!error && result && result.event === "success") {
//         // console.log('Done! Here is the image info: ', result.info);
//         galleryArr.push(result.info.url)
//     }
// })

class Create extends Component {
    state = {
        sort: "",
        price: "",
        imagePath: "",
        description: "",
        isPublic: false,
        errorMessages: {}
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const gallery = [];
        const { sort, description, imagePath, isPublic, price } = this.state;
        
        cherryService.postCreate({ sort, description, imagePath, isPublic, price, gallery }).then(res => {
            if (res.sort) {
                toast.info(`Успешно създадохте сорт ${res.sort}!`, {
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
        const { sort, price, imagePath, description, isPublic, errorMessages } = this.state;

        const sortError = errorMessages && errorMessages["sort"];
        const priceError = errorMessages && errorMessages["price"];
        const imagePathError = errorMessages && errorMessages["imagePath"];
        const descriptionError = errorMessages && errorMessages["description"];

        return (
            <section className="contacts">
                <ToastContainer autoClose={3500} />
                <div className="contact-header">
                    <h1>Създай нов сорт</h1>
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
                                placeholder="/images/imgName.jpg"
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
                                placeholder="Type some description up to 80 symbols"
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
                                value={isPublic}
                                onChange={this.handleFormElementChange}
                            />
                        </div>
                        {/* <div className="form-btn">
                            <p className="btn">
                                <button type="button" 
                                // id="upload_widget" 
                                // onClick={() => myWidget.open()} 
                                className="cloudinary-button">Upload files</button>
                            </p>
                        </div> */}
                        <div className="form-btn">
                            <p className="btn">
                                <button type="submit" className="primary-btn">Създай</button>
                            </p>
                        </div>
                    </form>
                </div>
            </section >
        );
    }
}

export default Create;