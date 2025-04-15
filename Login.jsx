
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password!");
      return;
    }

    try {
      // ✅ Hardcoded Admin Login
      if (isLoginMode && email === "admin@example.com" && password === "Admin@123!") {
        login({ email, role: "admin" });
        navigate("/admin");
        return;
      }

      const endpoint = isLoginMode ? "/api/login" : "/api/signup";
      const response = await fetch(`http://localhost:2000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      if (isLoginMode) {
        localStorage.setItem("token", data.token);
        login({ email, role: data.role });
        navigate(data.role === "admin" ? "/admin" : "/");
      } else {
        setError("Account created successfully. Please log in.");
        setIsLoginMode(true);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setError("Server error. Please try again later.");
    }
  };

  const handleGuestLogin = () => {
    login({ email: "guest@example.com", role: "guest" });
    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isLoginMode ? "Login" : "Create Account"}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleAuth}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            {isLoginMode ? "Login" : "Create Account"}
          </button>

          <button
            type="button"
            className="login-btn"
            onClick={() => {
              setError("");
              setIsLoginMode(!isLoginMode);
            }}
          >
            {isLoginMode ? "Create Account" : "Back to Login"}
          </button>

          {/* ✅ Guest Button */}
          {isLoginMode && (
            <button
              type="button"
              className="login-btn guest-btn"
              onClick={handleGuestLogin}
            >
              Continue as Guest
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;






































//DHRUV

// import React, { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { user, login, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const [coupon, setCoupon] = useState(""); // For storing coupon
//   const [isLoginMode, setIsLoginMode] = useState(true);

//   // Handle authentication (Login or Signup)
//   const handleAuth = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       setError("Please enter both email and password!");
//       return;
//     }

//     try {
//       const endpoint = isLoginMode ? "/api/login" : "/api/signup";
//       const response = await fetch(`http://localhost:5000${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.error || "Something went wrong.");
//         return;
//       }

//       if (isLoginMode) {
//         // Store token and coupon in context (login)
//         localStorage.setItem("token", data.token);
//         login({ email, role: data.role });
//         setCoupon(data.coupon);  // Set coupon from backend response
//         navigate(data.role === "admin" ? "/admin" : "/");
//       } else {
//         setCoupon("🎉 Welcome! Here’s a 10% off coupon: WELCOME10");
//         setError("Account created successfully. Please log in.");
//         setIsLoginMode(true);
//       }
//     } catch (err) {
//       console.error("Auth Error:", err);
//       setError("Server error. Please try again later.");
//     }
//   };

//   const handleGuestLogin = () => {
//     login({ email: "guest@example.com", role: "guest" });
//     navigate("/");
//   };

//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem("token");
//     setCoupon(""); // Clear coupon on logout
//     navigate("/login");
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>{isLoginMode ? "Login" : "Create Account"}</h2>
//         {error && <p className="error">{error}</p>}
//         {coupon && <p className="coupon">{`Your Coupon: ${coupon}`}</p>} {/* Show the coupon */}

//         {!user ? (
//           <form onSubmit={handleAuth}>
//             <div className="input-group">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="input-group">
//               <input
//                 type="password"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//             </div>

//             <button type="submit" className="login-btn">
//               {isLoginMode ? "Login" : "Create Account"}
//             </button>

//             <button
//               type="button"
//               className="login-btn"
//               onClick={() => {
//                 setError("");
//                 setCoupon(""); // Clear coupon when switching modes
//                 setIsLoginMode(!isLoginMode);
//               }}
//             >
//               {isLoginMode ? "Create Account" : "Back to Login"}
//             </button>

//             {isLoginMode && (
//               <button
//                 type="button"
//                 className="login-btn guest-btn"
//                 onClick={handleGuestLogin}
//               >
//                 Continue as Guest
//               </button>
//             )}
//           </form>
//         ) : (
//           <div>
//             <p>You are logged in as {user.email}</p>
//             <button className="login-btn logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//             <button className="login-btn coupons-btn" onClick={() => alert("🎁 Your coupon: " + coupon)}>
//               My Coupons
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Login;