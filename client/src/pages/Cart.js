import React, {useEffect, useState, useContext} from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import CartDisplay from '../components/CartDisplay';
import CartContext from '../CartContext';
import {Link} from 'react-router-dom';

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

function Cart( {user, increaseOrderCountCB} ) {
    const [message, setMessage] = useState("");

    let { cart } = useContext(CartContext);
    
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
    
        if (query.get("success")) {
          setMessage("Order placed! You will receive an email confirmation.");
        }
    
        if (query.get("canceled")) {
          setMessage(
            "Order canceled -- continue to shop around and checkout when you're ready."
          );
        }
      }, []);

    return (
      <div className="container d-flex flex-column align-items-center">
        <h2>Cart</h2>
        {
          cart.length === 0 && !message
          ?
          (<div>
          <p>You don't have anything in your cart right now!</p>
          <Link to="/products/all">Keep Browsing</Link>
          </div>)
          :
          message 
          ?
          <Message message={message} />
          :
          <CartDisplay user={user}/>
        }

      </div>
    )
    }

export default Cart;


