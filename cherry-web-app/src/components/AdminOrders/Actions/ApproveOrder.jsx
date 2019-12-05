import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import orderService from '../../../services/order-service';

function ApproveOrder(props) {
    const { id } = props.match.params;

    orderService.getApproveOrder(id).then(res => {
        
        if (res.ok) {
            toast.info("Успешно одобрена заявка!", {
                closeButton: false
            })
            props.history.push('/admin/pending-orders');
        } else {
            toast.error(`${res}`, {
                closeButton: false
            })
            return null;
        }

    }).catch(err => {
        console.log(err);
    })
return null;
    // return (
    //     <ToastContainer autoClose={3500} />
    // );
}
export default ApproveOrder;