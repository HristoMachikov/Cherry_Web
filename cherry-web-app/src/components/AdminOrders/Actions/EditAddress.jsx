import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../shared/styles/toast-position.scss';

import orderService from '../../../services/order-service';

const toastProps = { closeButton: false, className: 'toast-position' };

function EditAddress(props) {
    const { orderId, userAddress } = props.match.params;
    userAddress && orderService.getEditAddress(orderId, userAddress).then(res => {
        if (res && res.ok) {
            toast.info("Успешно променен адрес!", toastProps)
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
export default EditAddress;