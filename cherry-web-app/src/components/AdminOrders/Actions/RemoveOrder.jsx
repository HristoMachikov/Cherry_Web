import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../shared/styles/toast-position.scss';

import orderService from '../../../services/order-service';

const toastProps = { closeButton: false, className: 'toast-position' };

function RemoveOrder(props) {
    const { id } = props.match.params;

    orderService.getRemoveOrder(id).then(res => {

        if (res && res[0].ok) {
            toast.info("Успешно изтрита заявка!", toastProps)
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
export default RemoveOrder;