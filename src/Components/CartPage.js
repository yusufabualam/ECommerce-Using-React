import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from '../Store/Actions/RemoveFromCart';
import { updateQuantity } from '../Store/Actions/UpdateQuantity';

function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cart || []);
    const updatedquantity = useSelector((state) => state.item.item)
    
    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        dispatch(updateQuantity(productId, newQuantity));
    };

    const handleIncrementQuantity = (productId, quantity) => {
        const item = cartItems.find(item => item.id === productId);
        if (item) {
            const newQuantity = item.quantity + 1;
            handleUpdateQuantity(productId, newQuantity);
        }
    };

    const handleDecrementQuantity = (productId, stock) => {
        if (stock > 1) {
            const newQuantity = stock - 1;
            handleUpdateQuantity(productId, newQuantity);
        }
    };

    const calculateTotalPrice = (product) => {
        return product.price * product.quantity;
    };

    const calculateTotalTax = (cartItems) => {
        const totalTax = cartItems.reduce((acc, item) => {
            return acc + (item.price * item.quantity * 0.14); 
        }, 0);
        return totalTax;
    };

    const calculateGrandTotal = (cartItems) => {
        const totalPrice = cartItems.reduce((acc, item) => {
            return acc + (item.price * item.quantity);
        }, 0);
        const totalTax = calculateTotalTax(cartItems);
        return totalPrice + totalTax;
    };

    return (
        <div className="container mt-5 mb-5">
            <h1>Shopping Cart</h1>
            <div className="row">
                <div className="col">
                    {cartItems.map((item) => (
                        <div key={item.id} className="card mb-3">
                            <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">Price: ${item.price}</p>
                                <p className="card-text">stock: {item.stock}</p>
                                <div className="input-group mb-3">
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleDecrementQuantity(item.id, item.stock)}>-</button>
                                    <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                                    <button className="btn btn-outline-secondary" type="button" onClick={() => handleIncrementQuantity(item.id, item.stock)}>+</button>
                                </div>
                                <p className="card-text">Total: ${calculateTotalPrice(item)}</p>
                                <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            <p className="card-text">Total Items: {cartItems.length}</p>
                            <p className="card-text">Total Price: ${calculateGrandTotal(cartItems)}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
