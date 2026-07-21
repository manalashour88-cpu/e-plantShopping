import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping}) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total quantity of all products in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Calculate total cost of a specific item
  const calculateTotalCost = (item) => {
    return item.cost.replace('$', '') * item.quantity;
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cart.forEach(item => {
      totalAmount += item.cost.replace('$', '') * item.quantity;
    });
    return totalAmount;
  };

  // Handle incrementing an item's quantity
  const handleIncrement = (item) => {
    if (item.name === "Auditorium Hall (Capacity:200)" && item.quantity >= 3) {
      alert("You cannot add more than 3 Auditorium Halls.");
      return;
    }
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrementing an item's quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Handle removing an item from the cart
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Handle checkout
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <h3 style={{ color: 'black' }}>Total Items: {calculateTotalQuantity()}</h3>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => ContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
