import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import orderService from '../../../services/order-service';

function ApproveOrder(props) {
    const { id, status, commingDate } = props.match.params;
    orderService.getApproveOrder(id, status, commingDate).then(res => {
        if (res.ok) {
            toast.info("Успешно променен статус!", {
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
}
export default ApproveOrder;