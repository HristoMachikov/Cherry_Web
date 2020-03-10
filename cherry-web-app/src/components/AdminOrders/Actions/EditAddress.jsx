import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import orderService from '../../../services/order-service';

function EditAddress(props) {
    const { orderId, userAddress } = props.match.params;
    userAddress && orderService.postEditAddress(orderId, userAddress).then(res => {
        if (res && res.ok) {
            toast.info("Успешно променен адрес!", {
                closeButton: false
            })
            props.history.push('/admin/orders');
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
export default EditAddress;