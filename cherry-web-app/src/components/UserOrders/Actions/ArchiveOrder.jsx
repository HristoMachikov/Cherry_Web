import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import orderService from '../../../services/order-service';

function ArchiveOrder(props) {
    const { id } = props.match.params;
    orderService.getArchiveOrder(id).then(res => {
        if (res.ok) {
            toast.success("Успешно архивирана поръчка!", {
                closeButton: false
            })
            props.history.push('/order/my-orders');
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
export default ArchiveOrder;