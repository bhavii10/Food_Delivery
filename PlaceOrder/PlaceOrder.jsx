
//Asmita




// import React, { useState, useContext, useEffect } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";

// function PlaceOrder() {
//     const { getTotalCartAmount, cartItems, setCartItems } = useContext(StoreContext);

//     if (!getTotalCartAmount || !cartItems || !setCartItems) {
//         console.error("❌ StoreContext values are undefined. Ensure StoreProvider wraps App.");
//         return <h2>Error: Store Context Not Found</h2>;
//     }

//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         street: "",
//         city: "",
//         state: "",
//         pinCode: "",
//         country: "",
//         phone: "",
//     });

//     const [deliveryCharge, setDeliveryCharge] = useState(0);

//     useEffect(() => {
//         fetch("http://localhost:2000/delivery-charge")
//             .then(res => res.json())
//             .then(data => setDeliveryCharge(data.charge || 0))
//             .catch(err => console.error("Error fetching delivery charge:", err));
//     }, []);

//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src = "https://checkout.razorpay.com/v1/checkout.js";
//         script.async = true;
//         script.onload = () => console.log("✅ Razorpay Loaded");
//         script.onerror = () => console.error("❌ Failed to load Razorpay");
//         document.body.appendChild(script);
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handlePayment = async (e) => {
//         e.preventDefault();
//         const totalAmount = getTotalCartAmount() > 0 ? getTotalCartAmount() + deliveryCharge : 0;

//         if (totalAmount === 0) {
//             alert("🛒 Cart is empty! Please add items before proceeding.");
//             return;
//         }

//         const orderData = {
//             ...formData,
//             cartItems,
//             totalAmount,
//         };

//         try {
//             const response = await fetch("http://localhost:5001/create-order", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ amount: totalAmount*100  }),
//             });

//             if (!response.ok) throw new Error("Failed to create order");

//             const order = await response.json();
//             console.log("🛒 Razorpay Order Created:", order);

//             if (!order.id) {
//                 alert("⚠️ Order ID missing. Try again.");
//                 return;
//             }

//             if (!window.Razorpay) {
//                 alert("⚠️ Razorpay SDK not loaded! Check your internet connection.");
//                 return;
//             }

//             const options = {
//                 key: "rzp_test_gyFeWL6f6XC3g2",
//                 amount: order.amount,
//                 currency: "INR",
//                 name: "Tomato - Food Delivery",
//                 description: "Secure Payment",
//                 order_id: order.id,
//                 handler: async function (response) {
//                     console.log("✅ Payment Successful:", response);

//                     const verifyRes = await fetch("http://localhost:5001/api/verify-payment", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify(response),
//                     });

//                     const verifyData = await verifyRes.json();
//                     if (verifyData.success) {
//                         alert("🎉 Payment Successful! Order Placed.");

//                         const placeOrderResponse = await fetch("http://localhost:5001/api/place-order", {
//                             method: "POST",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify(orderData),
//                         });

//                         if (!placeOrderResponse.ok) {
//                             alert("⚠️ Order was paid but not recorded. Contact support.");
//                             return;
//                         }

//                         setCartItems({});
//                         localStorage.removeItem("cart");
//                     } else {
//                         alert("❌ Payment Verification Failed!");
//                     }
//                 },
//                 prefill: {
//                     name: `${formData.firstName} ${formData.lastName}`,
//                     email: formData.email,
//                     contact: formData.phone,
//                 },
//                 theme: { color: "#F37254" },
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open();
//         } catch (error) {
//             console.error("❌ Payment Error:", error);
//             alert("Something went wrong! Try again.");
//         }
//     };

//     return (
//         <form className="place-order" onSubmit={handlePayment}>
//             <div className="place-order-left">
//                 <p className="title">Delivery Information</p>
//                 <div className="multi-fields">
//                     <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
//                     <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
//                 </div>
//                 <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
//                 <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
//                 <div className="multi-fields">
//                     <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
//                     <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
//                 </div>
//                 <div className="multi-fields">
//                     <input type="text" name="pinCode" placeholder="Pin code" value={formData.pinCode} onChange={handleChange} required />
//                     <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
//                 </div>
//                 <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
//             </div>

//             <div className="place-order-right">
//                 <div className="cart-total">
//                     <h2>Cart Totals</h2>
//                     <div>
//                         <div className="cart-total-details">
//                             <p>Subtotal</p>
//                             <p>Rs {getTotalCartAmount()}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <p>Tax</p>
//                             <p>{getTotalCartAmount() > 0 ? deliveryCharge : 0}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <b>Total</b>
//                             <b>Rs {getTotalCartAmount() > 0 ? getTotalCartAmount() + deliveryCharge : 0}</b>
//                         </div>
//                         <button type="submit">PROCEED TO PAYMENT</button>
//                         <button type="button" onClick={() => handleRedeemAndNavigate("/wallet")}>
//                             TOMATO WALLET
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     );
// }

// export default PlaceOrder;






import React, { useState, useContext, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { useLocation,useNavigate } from "react-router-dom"; 
import axios from 'axios';

function PlaceOrder() {
    const { getTotalCartAmount, cartItems, setCartItems } = useContext(StoreContext);
    const location=useLocation();
    const navigate= useNavigate();

    const pointsUsed= location.state?.pointsUsed||0;
    const userEmail="user123@example.com";

    const subtotal=getTotalCartAmount();
    const deliveryFee= subtotal===0?0:2;
    const finalTotal=subtotal+deliveryFee-pointsUsed;

    if (!getTotalCartAmount || !cartItems || !setCartItems) {
        console.error("❌ StoreContext values are undefined. Ensure StoreProvider wraps App.");
        return <h2>Error: Store Context Not Found</h2>;
    }

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        pinCode: "",
        country: "",
        phone: "",
    });

    const [deliveryCharge, setDeliveryCharge] = useState(0);

    useEffect(() => {
        fetch("http://localhost:2000/delivery-charge")
            .then(res => res.json())
            .then(data => setDeliveryCharge(data.charge || 0))
            .catch(err => console.error("Error fetching delivery charge:", err));
    }, []);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => console.log("✅ Razorpay Loaded");
        script.onerror = () => console.error("❌ Failed to load Razorpay");
        document.body.appendChild(script);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        const totalAmount = getTotalCartAmount() > 0 ? getTotalCartAmount() + deliveryCharge : 0;

        if (totalAmount === 0) {
            alert("🛒 Cart is empty! Please add items before proceeding.");
            return;
        }

        const orderData = {
            ...formData,
            cartItems,
            totalAmount,
        };

        try {
            const response = await fetch("http://localhost:5001/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: totalAmount*100  }),
            });

            if (!response.ok) throw new Error("Failed to create order");

            const order = await response.json();
            console.log("🛒 Razorpay Order Created:", order);

            if (!order.id) {
                alert("⚠️ Order ID missing. Try again.");
                return;
            }

            if (!window.Razorpay) {
                alert("⚠️ Razorpay SDK not loaded! Check your internet connection.");
                return;
            }

            const options = {
                key: "rzp_test_gyFeWL6f6XC3g2",
                amount: order.amount,
                currency: "INR",
                name: "Tomato - Food Delivery",
                description: "Secure Payment",
                order_id: order.id,
                handler: async function (response) {
                    console.log("✅ Payment Successful:", response);

                    const verifyRes = await fetch("http://localhost:5001/api/verify-payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(response),
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("🎉 Payment Successful! Order Placed.");

                        const placeOrderResponse = await fetch("http://localhost:5001/api/place-order", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(orderData),
                        });

                        if (!placeOrderResponse.ok) {
                            alert("⚠️ Order was paid but not recorded. Contact support.");
                            return;
                        }

                        setCartItems({});
                        localStorage.removeItem("cart");
                    } else {
                        alert("❌ Payment Verification Failed!");
                    }
                },
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: { color: "#F37254" },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("❌ Payment Error:", error);
            alert("Something went wrong! Try again.");
        }
    };

    const handleRedeemAndNavigate = async (redirectPath) => {
        try {
            if (pointsUsed > 0) {
                // ✅ Send API request to redeem points
                const response = await axios.post("http://localhost:5000/api/loyalty/redeem", {
                    email: userEmail,
                    pointsToRedeem: pointsUsed
                });
    
                // ✅ Handle successful redemption
                if (response.data.success) {
                    alert(`Successfully redeemed ${pointsUsed} points!`);
                } else {
                    alert("Failed to redeem points: " + response.data.message);
                    return; // Stop execution if redemption fails
                }
            }
    
            // ✅ Navigate to the desired page after redemption
            navigate(redirectPath);
    
        } catch (error) {
            console.error("❌ Error Redeeming Points:", error.response ? error.response.data : error.message);
            alert("An error occurred while redeeming points.");
        }
    };
    

    return (
        <form className="place-order" onSubmit={handlePayment}>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                </div>
                <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required />
                <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} required />
                <div className="multi-fields">
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                    <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} required />
                </div>
                <div className="multi-fields">
                    <input type="text" name="pinCode" placeholder="Pin code" value={formData.pinCode} onChange={handleChange} required />
                    <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                </div>
                <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>Rs {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Tax</p>
                            <p>{getTotalCartAmount() > 0 ? deliveryCharge : 0}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Points Used</p>
                            <p>- Rs {pointsUsed}</p> {/* ✅ Display Used Points */}
                        </div>
                        <hr/>
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>Rs {getTotalCartAmount() > 0 ? getTotalCartAmount() + deliveryCharge : 0}</b>
                        </div>
                        <button type="submit">PROCEED TO PAYMENT</button>
                        <button type="button" onClick={() => handleRedeemAndNavigate("/wallet")}>
                            TOMATO WALLET
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;





















































































































//Bhavisha

// import React, { useContext, useEffect, useState } from 'react'; 
// import './PlaceOrder.css';
// import { StoreContext } from '../../context/StoreContext';
// import { useLocation, useNavigate } from 'react-router-dom';

// function PlaceOrder() {
//     const { getTotalCartAmount } = useContext(StoreContext);
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [deliveryCharge, setDeliveryCharge] = useState(0);  // 🆕 State for delivery charge

//     // ✅ Retrieve pointsUsed from state (default to 0 if not provided)
//     const pointsUsed = location.state?.pointsUsed || 0;

//     // ✅ Dummy user email (Replace with actual authentication email)
//     const userEmail = "user123@example.com"; 

//     // ✅ Fetch delivery charge from backend (using Fetch API)
//     useEffect(() => {
//         fetch("http://localhost:2000/delivery-charge")
//             .then(res => res.json())
//             .then(data => setDeliveryCharge(data.charge || 0))  // ✅ Set charge dynamically
//             .catch(err => console.error("Error fetching delivery charge:", err));
//     }, []);

//     // ✅ Calculate the final total
//     const subtotal = getTotalCartAmount();
//     const finalTotal = subtotal + deliveryCharge - pointsUsed;

//     // ✅ Function to Redeem Points and Navigate
//     const handleRedeemAndNavigate = async (redirectPath) => {
//         try {
//             if (pointsUsed > 0) {
//                 const response = await fetch("http://localhost:5000/api/loyalty/redeem", {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         email: userEmail,
//                         pointsToRedeem: pointsUsed
//                     }),
//                 });

//                 const result = await response.json();
//                 if (result.success) {
//                     alert(`Successfully redeemed ${pointsUsed} points!`);
//                 } else {
//                     alert("Failed to redeem points: " + result.message);
//                     return;
//                 }
//             }

//             navigate(redirectPath);
//         } catch (error) {
//             console.error("❌ Error Redeeming Points:", error);
//             alert("An error occurred while redeeming points.");
//         }
//     };

//     return (
//         <form className='place-order'>
//             <div className="place-order-left">
//                 <p className='title'>Delivery Information</p>
//                 <div className="multi-fields">
//                     <input type="text" placeholder='First Name' />
//                     <input type="text" placeholder='Last Name'/>
//                 </div>
//                 <input type="text" placeholder='Email address'/>
//                 <input type="text" placeholder='Street'/>
//                 <div className="multi-fields">
//                     <input type="text" placeholder='City' />
//                     <input type="text" placeholder='State'/>
//                 </div>
//                 <div className="multi-fields">
//                     <input type="text" placeholder='Pin code' />
//                     <input type="text" placeholder='Country'/>
//                 </div>
//                 <input type="text" placeholder='Phone' />
//             </div>

//             <div className="place-order-right">
//                 <div className="cart-total">
//                     <h2>Cart Totals</h2>
//                     <div>
//                         <div className="cart-total-details">
//                             <p>Subtotal</p>
//                             <p>Rs {subtotal}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <p>Delivery Fee</p>
//                             <p>Rs {deliveryCharge}</p>  {/* ✅ Uses dynamic delivery charge */}
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <p>Points Used</p>
//                             <p>- Rs {pointsUsed}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <b>Total</b>
//                             <b>Rs {finalTotal}</b>
//                         </div>
//                         <button type="button" onClick={() => handleRedeemAndNavigate("/payment")}>
//                             PROCEED TO PAYMENT
//                         </button>
//                         <button type="button" onClick={() => handleRedeemAndNavigate("/wallet")}>
//                             TOMATO WALLET
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     );
// }  

// export default PlaceOrder;






// import React, { useContext, useEffect, useState } from "react";
// import "./PlaceOrder.css";
// import { StoreContext } from "../../context/StoreContext";
// import { useLocation, useNavigate } from "react-router-dom";

// function PlaceOrder() {
//     const { getTotalCartAmount } = useContext(StoreContext);
//     const location = useLocation();
//     const navigate = useNavigate();

//     const [deliveryCharge, setDeliveryCharge] = useState(0);
//     const pointsUsed = location.state?.pointsUsed || 0;
//     const userEmail = "user123@example.com"; 

//     // Fetch delivery charge from backend
//     useEffect(() => {
//         fetch("http://localhost:2000/delivery-charge")
//             .then(res => res.json())
//             .then(data => setDeliveryCharge(data.charge || 0))
//             .catch(err => console.error("Error fetching delivery charge:", err));
//     }, []);

//     const subtotal = getTotalCartAmount();
//     const finalTotal = subtotal + deliveryCharge - pointsUsed;

//     // ✅ Function to initiate Razorpay Payment
//     const handlePayment = async () => {
//         try {
//             const response = await fetch("http://localhost:5001/api/payment/create-order", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ amount: finalTotal * 100 }) // Amount in paisa (1 INR = 100 paisa)
//             });

//             const orderData = await response.json();
//             if (!orderData.success) {
//                 alert("Error creating order: " + orderData.message);
//                 return;
//             }

//             // Load Razorpay SDK
//             const script = document.createElement("script");
//             script.src = "https://checkout.razorpay.com/v1/checkout.js";
//             script.async = true;
//             document.body.appendChild(script);

//             script.onload = () => {
//                 const options = {
//                     key: "YOUR_RAZORPAY_KEY_ID", // Replace with your actual Razorpay Key
//                     amount: finalTotal * 100,
//                     currency: "INR",
//                     name: "Tomato Food Delivery",
//                     description: "Order Payment",
//                     order_id: orderData.orderId, // Backend generated order ID
//                     handler: async (response) => {
//                         alert("Payment Successful!");
//                         console.log("Razorpay Response:", response);

//                         // ✅ Update order status in backend after successful payment
//                         await fetch("http://localhost:5001/api/payment/verify", {
//                             method: "POST",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                                 orderId: orderData.orderId,
//                                 paymentId: response.razorpay_payment_id,
//                                 signature: response.razorpay_signature,
//                                 email: userEmail,
//                                 amount: finalTotal
//                             })
//                         });

//                         navigate("/order-confirmation");
//                     },
//                     prefill: {
//                         name: "User Name",
//                         email: userEmail,
//                         contact: "9999999999"
//                     },
//                     theme: { color: "#f37254" }
//                 };

//                 const rzp = new window.Razorpay(options);
//                 rzp.open();
//             };
//         } catch (error) {
//             console.error("Error in payment:", error);
//             alert("Payment failed. Please try again.");
//         }
//     };

//     return (
//         <form className="place-order">
//             <div className="place-order-left">
//                 <p className="title">Delivery Information</p>
//                 <div className="multi-fields">
//                     <input type="text" placeholder="First Name" />
//                     <input type="text" placeholder="Last Name" />
//                 </div>
//                 <input type="text" placeholder="Email address" />
//                 <input type="text" placeholder="Street" />
//                 <div className="multi-fields">
//                     <input type="text" placeholder="City" />
//                     <input type="text" placeholder="State" />
//                 </div>
//                 <div className="multi-fields">
//                     <input type="text" placeholder="Pin code" />
//                     <input type="text" placeholder="Country" />
//                 </div>
//                 <input type="text" placeholder="Phone" />
//             </div>

//             <div className="place-order-right">
//                 <div className="cart-total">
//                     <h2>Cart Totals</h2>
//                     <div>
//                         <div className="cart-total-details">
//                             <p>Subtotal</p>
//                             <p>Rs {subtotal}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <p>Delivery Fee</p>
//                             <p>Rs {deliveryCharge}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <p>Points Used</p>
//                             <p>- Rs {pointsUsed}</p>
//                         </div>
//                         <hr />
//                         <div className="cart-total-details">
//                             <b>Total</b>
//                             <b>Rs {finalTotal}</b>
//                         </div>
//                         <button type="button" onClick={handlePayment}>
//                             PAY WITH RAZORPAY
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </form>
//     );
// }

// export default PlaceOrder;


