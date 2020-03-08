import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import orderService from '../../../services/order-service';

function RemoveOrder(props) {
    const { id } = props.match.params;

    orderService.getRemoveOrder(id).then(res => {

        if (res && res[0].ok) {
            toast.info("Успешно изтрита заявка!", {
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
export default RemoveOrder;