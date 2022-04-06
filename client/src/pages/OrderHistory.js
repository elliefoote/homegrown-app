import React, {useState, useEffect} from "react";
import Api from '../helpers/Api';
import './OrderHistory.css';
import Loading from '../components/Loading';

function OrderHistory({user}) {
    const [orders, setOrders] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getOrders();
   }, []);

   const getOrders = async () => {
        if (user) {
             let userid = user.userid;
             let response = await Api.getContent(`/orders/user/${userid}`);
             if (response.ok) {
                  
                let orders = response.data;

                // Treat the data so the currency and dates display correctly
                for (let order of orders) {
                    let datetime = new Date(order.orderdate.toString());
                    let dtString = datetime.toString().slice(0,25);
                    order.orderdate = dtString;

                    order.ordertotal = (order.ordertotal/100).toFixed(2)

                    for (let orderitem of order.orderItems) {
                        orderitem.orderprice = (orderitem.orderprice/100).toFixed(2);
                        orderitem.subtotal = (orderitem.subtotal/100).toFixed(2);
                    }
                } 
                
                setOrders(orders);
                setLoading(false);

             } else {
                  setErrorMsg(response.error);
                  setLoading(false);
             }
        }
   }; 
    
    return (
          <div className="container d-flex flex-column align-items-center">
               <h2 className="mb-3">Order History</h2>

                {
                loading
                ?
                <Loading />
                :
                orders.length > 0 
                ? orders.map(order =>  (
                
                    <div key={order.orderid} className="order-display mb-3">
                        <h4>Order ID: {order.orderid}</h4>
                        <p>Order created: {order.orderdate}</p>

                        <table className="table">
                        <thead>
                            <tr>
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            {
                                order.orderItems.map(orderitem => (
                                    <tr key={orderitem.itemid}>
                                    <td>{orderitem.productid}</td>
                                    <td>{orderitem.name}</td>
                                    <td>€{orderitem.orderprice}</td>
                                    <td>{orderitem.orderquantity}</td>
                                    <td className="text-end">€{orderitem.subtotal}</td>
                                    </tr>

                                ))
                            }

                                <tr>
                                <td colSpan="4" className="fw-bold text-end">ORDER TOTAL:</td>
                                <td className="text-end">€{order.ordertotal}</td>
                                </tr>
                        </tbody>
                        </table>

                    </div>
                    
                    )
                    ) 
                : 
                <p>You haven't made any orders yet! </p>
                }
               
          </div>
     );
}
export default OrderHistory;