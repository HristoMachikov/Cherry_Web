import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import userService from '../../services/user-service';
import '../../shared/styles/toast-position.scss';

const toastProps = { closeButton: false, className: 'toast-position' };

class ConfirmNewPassword extends Component {

    componentDidMount() {
        const { linkId } = this.props.match.params;
        if (linkId.length !== 40) {
            this.props.history.push('/');
            return;
        }
        userService.getConfirmNewPassword(linkId).then(res => {
            if (res && res.ok) {

                toast.success(`Успешно запазена нова парола!`, toastProps)
                this.props.history.push('/user/login');
            } else {
                toast.error(res, toastProps)
            }
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return <ToastContainer autoClose={3500} />;
    }
}

export default ConfirmNewPassword;