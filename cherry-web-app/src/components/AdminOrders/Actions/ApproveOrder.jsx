import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../shared/styles/toast-position.scss';

import orderService from '../../../services/order-service';

const toastProps = { closeButton: false, className: 'toast-position' };

function ApproveOrder(props) {
    const { id, status, commingDate } = props.match.params;
    orderService.getApproveOrder(id, status, commingDate).then(res => {
        if (res.ok) {
            toast.info("Успешно променен статус!", toastProps)
            props.history.push('/admin/orders');
        } else {
            toast.error(`${res}`, toastProps)
            return null;
        }
    }).catch(err => {
        console.log(err);
    })
    return null;
}
export default ApproveOrder;