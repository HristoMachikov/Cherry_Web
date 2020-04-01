import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../shared/styles/toast-position.scss';

import cherryService from '../../../services/cherry-service';

const toastProps = { closeButton: false, className: 'toast-position' };

function Remove(props) {
    const { id } = props.match.params;

    cherryService.getRemove(id).then(res => {
        if (res.ok) {
            toast.info("Успешно изтриване!", toastProps)
            props.history.push('/menu');
        } else {
            toast.error(`${res}`, toastProps)
            return null;
        }

    }).catch(err => {
        console.log(err);
    })

    return (
        <ToastContainer autoClose={4000} />
    );
}
export default Remove;