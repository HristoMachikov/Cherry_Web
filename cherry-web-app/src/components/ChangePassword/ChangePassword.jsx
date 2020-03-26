import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import withForm from '../../shared/hocs/withForm';

import * as yup from 'yup'

import userService from '../../services/user-service';

import { minLength } from '../../config/app-config';

class ChangePassword extends Component {

    onChangeHandler = this.props.controlOnChangeHandlerFactory();

    submitHandler = (event) => {
        event.preventDefault();

        this.props.runValidations()
            .then(formData => {
                const errors = this.props.getFormErrorState();

                const firstError = this.getFirstControlError('oldPassword')
                    || this.getFirstControlError('newPassword')
                    || this.getFirstControlError('repeatNewPassword');

                firstError && toast.warn(firstError, {
                    closeButton: false
                })

                if (!!errors) { return; }
                const data = this.props.getFormState();
                const { userId } = this.props;
                console.log(userId)
                return userService.changePassword(data, userId).then((res) => {
                    if (res && res.ok) {
                        toast.success(`Паролата е сменена успешно!`, {
                            closeButton: false
                        })
                        this.props.history.push('/');
                    } else {
                        toast.error(res, {
                            closeButton: false
                        })
                    }
                })
            }).catch(err => console.log(err));
    };

    getFirstControlError = name => {
        const errorState = this.props.getFormErrorState();
        return errorState && errorState[name] && errorState[name][0];
    };

    render() {

        const currentInputName = this.props.getFormState().currentName;
        const currentInputChecked = this.props.getFormState()[currentInputName];

        const classErrorNewPassword = (currentInputName === 'newPassword' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";
        const classErrorRepeatNewPassword = (currentInputName === 'repeatNewPassword' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";
        const classErrorOldPassword = (currentInputName === 'oldPassword' && currentInputChecked && currentInputChecked.length < minLength) ? " error" : "";

        return (
            <section className="site-section login">
                <ToastContainer autoClose={3500} />

                <form onSubmit={this.submitHandler} className="main-form">
                    <fieldset className="main-form-fieldsed">
                        <legend className="main-form-legent">Смяна на парола</legend>

                        <p className="form-field password first">
                            <label htmlFor="old-password">Стара парола</label>
                            <input
                                className={`form-input${classErrorOldPassword}`}
                                type="password"
                                name="oldPassword"
                                id="old-password"
                                onChange={this.onChangeHandler}
                            />
                            <span></span>
                        </p>
                        <p className="form-field password">
                            <label htmlFor="new-password">Нова парола</label>
                            <input
                                className={`form-input${classErrorNewPassword}`}
                                type="password"
                                name="newPassword"
                                id="new-password"
                                onChange={this.onChangeHandler}
                            />
                            <span></span>
                        </p>
                        <p className="form-field password last">
                            <label htmlFor="repeat-new-password">Повтори новата парола</label>
                            <input
                                className={`form-input${classErrorRepeatNewPassword}`}
                                type="password"
                                name="repeatNewPassword"
                                id="repeat-new-password"
                                onChange={this.onChangeHandler}
                            />
                            <span></span>
                        </p>
                        <p className="form-btn">
                            <button className="primary-btn" type="submit">Смени паролата</button>
                        </p>
                    </fieldset>
                </form>
            </section>
        );
    }
}

const initialFormState = {
    oldPassword: "",
    newPassword: '',
    repeatNewPassword: ''
};

const schema = yup.object().shape({

    oldPassword: yup
        .string()
        .required("Въведете старата парола!")
        .matches(/^[а-яА-Яa-zA-Z0-9]*[а-яА-Яa-zA-Z0-9]$/, "Паролата трябва да е само с букви и цифри!")
        .min(minLength, `Паролата трябва да е поне ${minLength} символа!`),
    newPassword: yup
        .string()
        .required("Въведете новата парола!")
        .matches(/^[а-яА-Яa-zA-Z0-9]*[а-яА-Яa-zA-Z0-9]$/, "Паролата трябва да е само с букви и цифри!")
        .min(minLength, `Паролата трябва да е поне ${minLength} символа!`),

    repeatNewPassword: yup
        .mixed()
        .required("Повторете новата парола!")
        .oneOf([yup.ref('newPassword'), null], "Паролите не съвпадат!")
        .notOneOf(['    ', null], "Въведете друга парола!"),

});
export default withForm(ChangePassword, initialFormState, schema);