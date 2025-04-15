//Bhavisha
import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();
    const [orderStatus, setOrderStatus] = useState("");
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [pointsToDeduct, setPointsToDeduct] = useState(0);
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const userEmail = "user123@example.com";  // Replace with dynamic user email if needed

    console.log("cartItems:", cartItems);
    console.log("food_list:", food_list);

    // 🔥 Fetch Loyalty Points for user
    useEffect(() => {
        fetch(`http://localhost:5000/api/loyalty/${userEmail}`)
            .then(res => res.json())
            .then(data => setLoyaltyPoints(data.totalPoints || 0))
            .catch(err => console.error("Error fetching loyalty points:", err));
    }, [cartItems]);

    // 🚚 Fetch Delivery Charge from backend
    useEffect(() => {
        fetch("http://localhost:2000/delivery-charge")
            .then(res => res.json())
            .then(data => setDeliveryCharge(data.charge || 0))
            .catch(err => console.error("Error fetching delivery charge:", err));
    }, []);

    // 🛒 Handle User Input for Loyalty Points
    const handlePointsInput = (e) => {
        let enteredPoints = parseInt(e.target.value) || 0;

        // ✅ Ensure entered points are within valid limits
        const maxAllowed = Math.min(loyaltyPoints, getTotalCartAmount());
        if (enteredPoints > maxAllowed) {
            enteredPoints = maxAllowed;
        }
        if (enteredPoints < 0) {
            enteredPoints = 0;
        }

        setPointsToDeduct(enteredPoints);
    };

    // 🛒 Function to Place Order
    const placeOrder = async () => {
        const formattedCartItems = food_list
            .filter(item => cartItems[item.id] > 0)
            .map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: cartItems[item.id]
            }));

        const finalAmount = getTotalCartAmount() + deliveryCharge - pointsToDeduct; // ✅ Updated total amount

        const orderData = {
            email: userEmail,
            cartItems: formattedCartItems,
            totalAmount: finalAmount
        };

        console.log("📦 Order Data:", JSON.stringify(orderData, null, 2));

        try {
            const response = await fetch('http://localhost:5002/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();
            setOrderStatus(data.message);

            // 🔥 Deduct loyalty points after order placement
            if (pointsToDeduct > 0) {
                await fetch('http://localhost:5000/api/redeem', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: userEmail, pointsToRedeem: pointsToDeduct })
                });

                setLoyaltyPoints(loyaltyPoints - pointsToDeduct);
                setPointsToDeduct(0);
            }
        } catch (error) {
            console.error("❌ Error placing order:", error);
        }
    };

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr/>

                {food_list.map((item) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div key={item.id}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={item.image} alt={item.name} />
                                    <p>{item.name}</p>
                                    <p>Rs {item.price}</p>
                                    <p>{cartItems[item.id]}</p>
                                    <p>Rs {item.price * cartItems[item.id]}</p>
                                    <p onClick={() => removeFromCart(item.id)} className='cross'>x</p>
                                </div>
                                <hr/>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>Rs {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Tax</p>
                            <p>Rs {getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p> {/* ✅ Updated */}
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Loyalty Points (Available)</p>
                            <p>{loyaltyPoints} Points</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Use Points</p>
                            <input 
                                type="number" 
                                value={pointsToDeduct} 
                                onChange={handlePointsInput}
                                min="0"
                                max={Math.min(loyaltyPoints, getTotalCartAmount())}
                            />
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge - pointsToDeduct}</b>
                        </div>
                        <button 
                            onClick={() => { 
                            placeOrder(); 
                            navigate('/order', { state: { pointsUsed: pointsToDeduct } }); // ✅ Pass points used
                            }}
                        >
                            PROCEED TO CHECKOUT
                        </button>

                        {orderStatus && <p>{orderStatus}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
































































// import React, { useContext, useState } from 'react';
// import './Cart.css';
// import { StoreContext } from '../../context/StoreContext';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//     const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
//     const navigate = useNavigate();
//     const [orderStatus, setOrderStatus] = useState("");

//     console.log('Hello')
//     console.log("cartItems:", cartItems);
//     console.log("food_list:", food_list);
//     console.log("removeFromCart function:", removeFromCart);
//     console.log("getTotalCartAmount function:", getTotalCartAmount);

//     // 🛒 Function to Place Order
//     const placeOrder = async () => {
//         const formattedCartItems = food_list
//             .filter(item => cartItems[item.id] > 0)
//             .map(item => ({
//                 id: item.id,
//                 name: item.name,
//                 price: item.price,
//                 quantity: cartItems[item.id]
//             }));

//         const orderData = {
//             cartItems: formattedCartItems,
//             totalAmount: getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2
//         };

//         console.log("📦 Order Data:", JSON.stringify(orderData, null, 2)); // ✅ Logs the order JSON

//         try {
//             const response = await fetch('http://localhost:5001/create-order', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(orderData)
//             });

//             const data = await response.json();
//             setOrderStatus(data.message);
//         } catch (error) {
//             console.error("❌ Error placing order:", error);
//         }
//     };

//     return (
//         <div className='cart'>
//             <h2>🛒 Your Cart</h2>
//             {food_list.length === 0 || Object.values(cartItems).every(qty => qty === 0) ? (
//                 <p>Cart is empty</p>
//             ) : (
//                 <>
//                     <div className="cart-items">
//                         <div className='cart-items-title'>
//                             <p>Items</p>
//                             <p>Title</p>
//                             <p>Price</p>
//                             <p>Quantity</p>
//                             <p>Total</p>
//                             <p>Remove</p>
//                         </div>
//                         <br />
//                         <hr/>
//                         {food_list.map((item) => {
//                             if (cartItems[item.id] > 0) {
//                                 return (
//                                     <div key={item.id}>
//                                         <div className='cart-items-title cart-items-item'>
//                                             <img src={item.image} alt={item.name} />
//                                             <p>{item.name}</p>
//                                             <p>Rs {item.price}</p>
//                                             <p>{cartItems[item.id]}</p>
//                                             <p>Rs {item.price * cartItems[item.id]}</p>
//                                             <p onClick={() => removeFromCart(item.id)} className='cross'>x</p>
//                                         </div>
//                                         <hr/>
//                                     </div>
//                                 );
//                             }
//                             return null;
//                         })}
//                     </div>
//                     <div className="cart-bottom">
//                         <div className="cart-total">
//                             <h2>Cart Total</h2>
//                             <div>
//                                 <div className="cart-total-details">
//                                     <p>Subtotal</p>
//                                     <p>Rs {getTotalCartAmount()}</p>
//                                 </div>
//                                 <hr />
//                                 <div className="cart-total-details">
//                                     <p>Delivery Fee</p>
//                                     <p>{getTotalCartAmount() === 0 ? 0 : 2}</p>
//                                 </div>
//                                 <hr />
//                                 <div className="cart-total-details">
//                                     <b>Total</b>
//                                     <b>Rs {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//                                 </div>
//                                 <button onClick={() => { placeOrder(); navigate('/order'); }}>
//                                     Proceed To Checkout
//                                 </button>

//                                 {orderStatus && <p>{orderStatus}</p>}
//                             </div>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default Cart;
