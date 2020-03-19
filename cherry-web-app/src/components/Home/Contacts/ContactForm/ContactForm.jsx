import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup'

import userService from '../../../../services/user-service';

import { useFormControl, getValidationsRunnerForSchema } from '../../../../shared/hocs/withForm'
import { minLength, minLengthFirstName } from '../../../../config/app-config';

const requiredField = "Здължително поле!";
const validations = {
    firstname: yup
        .string()
        .required(requiredField)
        .min(minLengthFirstName, `Името трябва да е поне ${minLengthFirstName} символа!`),
    lastname: yup
        .string(),
    // .min(minLength, `Фамилията трябва да е поне ${minLength} символа!`),
    email: yup
        .string()
        .required(requiredField)
        .email("Въведете валиден E-mail!"),
    theme: yup
        .string()
        .required(requiredField)
        .min(minLength, `Темата трябва да е поне ${minLength} символа!`),
    message: yup
        .string()
        .required(requiredField)
        .min(minLength, `Съобщението трябва да е поне ${minLength} символа!`)
        .max(80, `Съобщението трябва да е не повече от 80 символа!`)
};

const schema = yup.object().shape(validations);

const validationsRunner = getValidationsRunnerForSchema(schema);

function ContactForm({history}) {

    let [firstname, setFirstname] = React.useState(null);
    let [lastname, setLastname] = React.useState(null);
    let [email, setEmail] = React.useState(null);
    let [theme, setTheme] = React.useState(null);
    let [message, setMessage] = React.useState(null);

    const firstnameFormControl = useFormControl('', validations.firstname);
    const lastnameFormControl = useFormControl('', validations.lastname);
    const emailFormControl = useFormControl('', validations.email);
    const themeFormControl = useFormControl('', validations.theme);
    const messageFormControl = useFormControl('', validations.message);
    const [serverError, setServerError] = React.useState(undefined);
    const [firstnameError, setFirstnameError] = React.useState(undefined);
    const [emailError, setEmailError] = React.useState(undefined);
    const [themeError, setThemeError] = React.useState(undefined);
    const [messageError, setMessageError] = React.useState(undefined);

    // const onChangeNameHandler = (event) => {
    //     let { name, value } = event.target;
    //     if (name === "lastname") {
    //         setLastname(value);
    //     }
    //     if (name === "firstname") {
    //         setFirstname(value);
    //     }
    // }

    // const onChangeEmailHandler = (event) => {
    //     setEmail(event.target.value);
    // }

    // const onChangeThemeHandler = (event) => {
    //     setTheme(event.target.value);
    // }

    // const onChangeMessageHandler = (event) => {
    //     setMessage(event.target.value);
    // }
    // React.useEffect(() => {

    // }, [])

    const resetHandler = (e) => {
        e.preventDefault();
        e.target.firstname.value = "";
        e.target.lastname.value = "";
        e.target.email.value = "";
        e.target.theme.value = "";
        e.target.message.value = "";
        firstnameFormControl.setErrors([]);
        emailFormControl.setErrors([]);
        themeFormControl.setErrors([]);
        messageFormControl.setErrors([]);
    };

    const submitHandler = React.useCallback(() => {
        validationsRunner({
            firstname: firstnameFormControl.value,
            lastname: lastnameFormControl.value,
            email: emailFormControl.value,
            theme: themeFormControl.value,
            message: messageFormControl.value
        }).then(data => {
            console.log(data)
            userService.sendEmail(data).then(res=>{
                console.log(res);
                toast.success("Съобщението е изпратено!", {
                    closeButton: false
                  });
                  history.push('/');
            }).catch(error => {
                if (typeof error === 'object') { throw error; }
                setServerError(error);
            });

        }).catch(errors => {
            if (errors.firstname) { firstnameFormControl.setErrors(errors.firstname); }
            if (errors.lastname) { lastnameFormControl.setErrors(errors.lastname); }
            if (errors.email) { emailFormControl.setErrors(errors.email); }
            if (errors.theme) { themeFormControl.setErrors(errors.theme); }
            if (errors.message) { messageFormControl.setErrors(errors.message); }
            console.log(errors);
        })
    }, [firstnameFormControl, lastnameFormControl, emailFormControl, themeFormControl, messageFormControl, setServerError]
        // console.log({ firstname, lastname, email, theme, message })

        //     userService.sendEmail({ firstname, lastname, email, theme, message })
        //         .then(data => {

        //             console.log(data);

        //         }).catch(errors => {


        //             console.log(errors)

        //         })
        // },
        //  [firstname, lastname, email, theme, message]
    );

    // console.log(firstname, lastname, email, theme, message);

    return (<div className="contact-form">
        <form onSubmit={resetHandler}>
            <div className="title">
                <h6>Изпратете запитване</h6>
            </div>
            <span className="errors">
                {firstnameFormControl.errors && firstnameFormControl.errors[0] !== requiredField && firstnameFormControl.errors[0]}
                <p> {emailFormControl.errors && emailFormControl.errors[0] !== requiredField && emailFormControl.errors[0]}</p>
                <p>{themeFormControl.errors && themeFormControl.errors[0] !== requiredField && themeFormControl.errors[0]}</p>
                <p>{messageFormControl.errors && messageFormControl.errors[0] !== requiredField && messageFormControl.errors[0]}</p>
                <p>{serverError && serverError}</p>
            </span>
            <div className="name">
                <p className="firstname">
                    <label htmlFor="firstname">
                        Име:
                    <span>*{firstnameFormControl.errors && firstnameFormControl.errors[0] === requiredField && firstnameFormControl.errors[0]}</span>
                    </label>
                    <input type="text"
                        name="firstname"
                        id="firstname"
                        // value={firstname}
                        onChange={firstnameFormControl.changeHandler} />
                    <span>Име</span>
                </p>
                <p className="lastname">
                    <label htmlFor="lastname">Фамилия:<span>*</span></label>
                    <input type="text"
                        name="lastname"
                        id="lastname"
                        // value={lastname}
                        onChange={lastnameFormControl.changeHandler} />
                    <span>Фамилия</span>
                </p>
            </div>
            <p className="email">
                <label htmlFor="email">E-mail:
                <span>*{emailFormControl.errors && emailFormControl.errors[0] === requiredField && emailFormControl.errors[0]}</span>
                </label>
                <input type="email"
                    name="email"
                    id="email"
                    // value={email}
                    onChange={emailFormControl.changeHandler} />
            </p>
            <p className="theme">
                <label htmlFor="theme">Тема:
                <span>*{themeFormControl.errors && themeFormControl.errors[0] === requiredField && themeFormControl.errors[0]}</span>
                </label>
                <input type="text"
                    name="theme"
                    id="theme"
                    // value={theme}
                    onChange={themeFormControl.changeHandler} />
            </p>
            <p className="message">
                <label htmlFor="message">Съобщение:
                <span>* {messageFormControl.errors && messageFormControl.errors[0] === requiredField && messageFormControl.errors[0]}</span>
                </label>
                <textarea name="message"
                    id="message"
                    rows="5"
                    onChange={messageFormControl.changeHandler}
                // value={message} 
                />
            </p>
            <div className="form-btn">
                <p className="btn">
                    <button className="primary-btn" type="button" onClick={submitHandler}>Изпрати</button>
                </p>
                <p className="btn">
                    <button className="primary-btn" type="submit">Изчисти</button>
                </p>
            </div>

        </form>
    </div>);
}

export default ContactForm;