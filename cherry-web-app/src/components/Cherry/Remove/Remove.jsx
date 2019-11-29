import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cherryService from '../../../services/cherry-service';

function Remove(props) {
    const { id } = props.match.params;

    cherryService.getRemove(id).then(res => {
        if (res.ok) {
            toast.info("Успешно изтриване!", {
                closeButton: false
            })
            props.history.push('/');
        } else {
            toast.error(`${res}`, {
                closeButton: false
            })
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