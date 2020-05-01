import React from 'react';

import ReCAPTCHA from "react-google-recaptcha";
// import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import { ToastContainer, toast } from 'react-toastify';
import * as yup from 'yup'

import userService from '../../../../services/user-service';

import { useFormControl, getValidationsRunnerForSchema } from '../../../../shared/hocs/withForm'
import { minLength, minLengthFirstName, minReCaptchaWidth, reCaptchaSiteKey } from '../../../../config/app-config';

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
        .min(minLength, `Трябва да е поне ${minLength} символа!`)
        .max(80, `Трябва да е не повече от 80 символа!`)
};

const schema = yup.object().shape(validations);

const validationsRunner = getValidationsRunnerForSchema(schema);

function useWindowSize() {
    const [size, setSize] = React.useState(window.innerWidth);
    React.useLayoutEffect(() => {
        function updateSize() {
            setSize(window.innerWidth);
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

function ContactForm({ history }) {

    // let [firstname, setFirstname] = React.useState(null);
    // let [lastname, setLastname] = React.useState(null);
    // let [email, setEmail] = React.useState(null);
    // let [theme, setTheme] = React.useState(null);
    // let [message, setMessage] = React.useState(null);

    const firstnameFormControl = useFormControl('', validations.firstname);
    const lastnameFormControl = useFormControl('', validations.lastname);
    const emailFormControl = useFormControl('', validations.email);
    const themeFormControl = useFormControl('', validations.theme);
    const messageFormControl = useFormControl('', validations.message);
    const [serverError, setServerError] = React.useState(undefined);

    const windowInnerWidth = useWindowSize();

    const recaptchaRef = React.useRef();
    // const onChange = (value) => {
    //     console.log("Captcha value:", value);
    // }

    // const { executeRecaptcha } = useGoogleReCaptcha();
    // const [token, setToken] = React.useState("");

    // const clickHandler = async () => {
    //     if (!executeRecaptcha) {
    //         return;
    //     }
    //     const result = await executeRecaptcha("");
    //     setToken(result);
    // }

    const resetHandler = (e) => {
        e.preventDefault();

        e.target.firstname.value = "";
        e.target.lastname.value = "";
        e.target.email.value = "";
        e.target.theme.value = "";
        e.target.message.value = "";
        firstnameFormControl.setValue("");
        lastnameFormControl.setValue("");
        emailFormControl.setValue("");
        themeFormControl.setValue("");
        messageFormControl.setValue("");
        firstnameFormControl.setErrors([]);
        emailFormControl.setErrors([]);
        themeFormControl.setErrors([]);
        messageFormControl.setErrors([]);
        recaptchaRef.current.reset();
    };

    const submitHandler = React.useCallback(() => {
        validationsRunner({
            firstname: firstnameFormControl.value,
            lastname: lastnameFormControl.value,
            email: emailFormControl.value,
            theme: themeFormControl.value,
            message: messageFormControl.value
        }).then(data => {

            const recaptchaValue = recaptchaRef.current.getValue();
            recaptchaValue && userService.sendEmail(data).then(res => {
                // console.log(res);
                if (res && res.messageId) {
                    toast.success("Съобщението е изпратено!", {
                        closeButton: false
                    });
                    history.push('/menu');
                    history.push('/');
                } else if (res === undefined
                    || res.code === "EAUTH") {
                    toast.error("Съобщението не е изпратено!", {
                        closeButton: false
                    })
                }
            }).catch(error => {
                if (typeof error === 'object') { throw error; }
                setServerError(error);
                // console.log(error);
            });
        }).catch(errors => {
            if (errors.firstname) { firstnameFormControl.setErrors(errors.firstname); }
            if (errors.lastname) { lastnameFormControl.setErrors(errors.lastname); }
            if (errors.email) { emailFormControl.setErrors(errors.email); }
            if (errors.theme) { themeFormControl.setErrors(errors.theme); }
            if (errors.message) { messageFormControl.setErrors(errors.message); }
            console.log(errors);
        })
    }, [firstnameFormControl, lastnameFormControl, emailFormControl, themeFormControl, messageFormControl, setServerError]);

    return (<div className="contact-form">
        <form onSubmit={resetHandler}>
            <div className="title">
                <h6>Изпратете запитване</h6>
            </div>
            <span className="errors">
                {/* {firstnameFormControl.errors && firstnameFormControl.errors[0] !== requiredField && firstnameFormControl.errors[0]}
                <p> {emailFormControl.errors && emailFormControl.errors[0] !== requiredField && emailFormControl.errors[0]}</p>
                <p>{themeFormControl.errors && themeFormControl.errors[0] !== requiredField && themeFormControl.errors[0]}</p>
                <p>{messageFormControl.errors && messageFormControl.errors[0] !== requiredField && messageFormControl.errors[0]}</p> */}
                <p>{serverError && serverError}</p>
            </span>
            <div className="name">
                <p className="firstname">
                    <label htmlFor="firstname">
                        Име:
                    {/* <span>*{firstnameFormControl.errors && firstnameFormControl.errors[0] === requiredField && firstnameFormControl.errors[0]}</span> */}
                        <span>*{firstnameFormControl.errors && firstnameFormControl.errors[0]}</span>
                    </label>
                    <input type="text"
                        name="firstname"
                        id="firstname"
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
                <span>*{emailFormControl.errors && emailFormControl.errors[0]}</span>
                </label>
                <input type="email"
                    name="email"
                    id="email"
                    // value={email}
                    onChange={emailFormControl.changeHandler} />
            </p>
            <p className="theme">
                <label htmlFor="theme">Тема:
                <span>*{themeFormControl.errors && themeFormControl.errors[0]}</span>
                </label>
                <input type="text"
                    name="theme"
                    id="theme"
                    // value={theme}
                    onChange={themeFormControl.changeHandler} />
            </p>
            <p className="message">
                <label htmlFor="message">Съобщение:
                <span>* {messageFormControl.errors && messageFormControl.errors[0]}</span>
                </label>
                <textarea name="message"
                    id="message"
                    rows="5"
                    onChange={messageFormControl.changeHandler}
                // value={message} 
                />
            </p>
            <div className="form-recaptcha">
                <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={reCaptchaSiteKey}
                    size={windowInnerWidth < minReCaptchaWidth ? "compact" : "normal"}
                    hl={"bg"}
                />
            </div>
            <div className="form-btn">
                <p className="btn">
                    <button className="primary-btn" type="button" onClick={submitHandler}>Изпрати</button>
                </p>
                <p className="btn">
                    <button className="primary-btn" type="submit">Изчисти</button>
                </p>
                {/* <p className="btn">
                    <button className="primary-btn" type="button" onClick={clickHandler} >Не съм робот!</button>
                </p>
                {token && <p>Token: {token}</p>} */}
            </div>
        </form>
    </div>);
}

export default ContactForm;