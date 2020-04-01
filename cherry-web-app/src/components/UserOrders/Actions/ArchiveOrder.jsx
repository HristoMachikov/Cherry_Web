import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../shared/styles/toast-position.scss';

import orderService from '../../../services/order-service';

const toastProps = { closeButton: false, className: 'toast-position' };

function ArchiveOrder(props) {
    const { id } = props.match.params;
    orderService.getArchiveOrder(id).then(res => {
        if (res.ok) {
            toast.success("Успешно архивирана поръчка!", toastProps)
            props.history.push('/order/my-orders');
        } else {
            toast.error(`${res}`, toastProps)
            return null;
        }
    }).catch(err => {
        console.log(err);
    })
    return null;
}
export default ArchiveOrder;