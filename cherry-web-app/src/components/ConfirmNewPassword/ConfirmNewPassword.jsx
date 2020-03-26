import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import userService from '../../services/user-service';

class ConfirmNewPassword extends Component {

    componentDidMount() {
        const { linkId } = this.props.match.params;
        if (linkId.length !== 40) {
            this.props.history.push('/');
            return;
        }
        userService.getConfirmNewPassword(linkId).then(res => {
            if (res && res.ok) {

                toast.success(`Успешно запазена нова парола!`, {
                    closeButton: false
                })
                this.props.history.push('/user/login');
            } else {
                toast.error(res, {
                    closeButton: false
                })
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