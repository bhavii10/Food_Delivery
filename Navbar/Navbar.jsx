











// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import logo from "../../assets/logo.png";
// import searchIcon from "../../assets/search_icon.png";
// import basketIcon from "../../assets/basket_icon.png";

// const Navbar = () => {
//   const [menu, setMenu] = useState("home");

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={logo} alt="Logo" className="logo" />
//       </Link>

//       <ul className="navbar-menu">
//         <li className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>
//           <Link to="/">Home</Link>
//         </li>
//         <li className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>
//           <Link to="/menu">Menu</Link>
//         </li>
//         <li className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>
//           <Link to="/contact-us">Contact Us</Link>
//         </li>
//       </ul>

//       <div className="navbar-right">
//         <img src={searchIcon} alt="Search" />
//         <div className="navbar-search-icon">
//           <Link to="/cart">
//             <img src={basketIcon} alt="Basket" />
//           </Link>
//           <div className="dot"></div>
//         </div>
//         <li>
//           <Link to="/track">Track Order</Link>
//         </li>
//         <Link to="/login">
//           <button>Sign In</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;







































// import React, { useState } from "react";
// import "./Navbar.css";
// import logo from "../../assets/logo.png";
// import searchIcon from "../../assets/search_icon.png";
// import basketIcon from "../../assets/basket_icon.png";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const [menu, setMenu] = useState("home");

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={logo} alt="Logo" className="logo" />
//       </Link>
//       <ul className="navbar-menu">
//         <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
//           <Link to="/">Home</Link>
//         </li>
//         <li className={menu === "menu" ? "active" : ""}>
//           <Link to="/menu" onClick={() => setMenu("menu")}>Menu</Link>
//         </li>
//         <li className={menu === "contact-us" ? "active" : ""}>
//           <Link to="/contact-us" onClick={() => setMenu("contact-us")}>Contact Us</Link>
//         </li>
//       </ul>

//       <div className="navbar-right">
//         <img src={searchIcon} alt="Search" />
        
//         <div className="navbar-icons">
//           {/* Wallet Icon (Using SVG) */}
//         <Link to="/wallet" className="wallet-icon-container">
        
//         <svg 
//         className="wallet-icon" 
//         width="24" 
//         height="24" 
//         viewBox="0 0 24 24" 
//         fill="none" 
//         xmlns="http://www.w3.org/2000/svg"
//         >

//       <path 
//         d="M3 6H21C21.5523 6 22 6.44772 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7C2 6.44772 2.44772 6 3 6Z" 
//         stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//       />

//       <path 
//         d="M18 10H22V14H18C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10Z" 
//         stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//       />

//       <circle cx="19" cy="12" r="1" fill="#49557e"/>
      
//       <path 
//         d="M6 6V4C6 3.44772 6.44772 3 7 3H17C17.5523 3 18 3.44772 18 4V6" 
//         stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
//       />
//       </svg>
//       <div className="dot"></div> 
//       </Link>





//           {/* Cart Icon with Notification Dot */}
//           <Link to="/cart" className="basket-icon-container">
//             <img src={basketIcon} alt="Basket" className="basket-icon" />
//             <div className="dot"></div> {/* Dot for cart notifications */}
//           </Link>
//         </div>

//         <li>
//           <Link to="/track">Track Order</Link>
//         </li>
//         <Link to="/login">
//           <button>Sign In</button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;













///BHAVISHA ASMITA 
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";
// import logo from "../../assets/logo.png";
// import searchIcon from "../../assets/search_icon.png";
// import basketIcon from "../../assets/basket_icon.png";
//import { AuthContext } from "../../context/AuthContext";


// const Navbar = () => {
//   const [menu, setMenu] = useState("home");
//   const [groupId, setGroupId] = useState("");

//   const createGroup = () => {
//     const newGroupId = Math.random().toString(36).substring(7); // Generate random group ID
//     setGroupId(newGroupId);
//   };

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={logo} alt="Logo" className="logo" />
//       </Link>
//       <ul className="navbar-menu">
//         <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
//           <Link to="/">Home</Link>
//         </li>
//         <li className={menu === "menu" ? "active" : ""}>
//           <Link to="/menu" onClick={() => setMenu("menu")}>Menu</Link>
//         </li>
//         <li className={menu === "contact-us" ? "active" : ""}>
//           <Link to="/contact-us" onClick={() => setMenu("contact-us")}>Contact Us</Link>
//         </li>
//       </ul>

//       <div className="navbar-right">
//         <img src={searchIcon} alt="Search" />
        
//         <div className="navbar-icons">
//           <Link to="/wallet" className="wallet-icon-container">
//             <svg 
//               className="wallet-icon" 
//               width="24" 
//               height="24" 
//               viewBox="0 0 24 24" 
//               fill="none" 
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path d="M3 6H21C21.5523 6 22 6.44772 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7C2 6.44772 2.44772 6 3 6Z" stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <path d="M18 10H22V14H18C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10Z" stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               <circle cx="19" cy="12" r="1" fill="#49557e"/>
//               <path d="M6 6V4C6 3.44772 6.44772 3 7 3H17C17.5523 3 18 3.44772 18 4V6" stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             <div className="dot"></div> 
//           </Link>

//           <Link to="/cart" className="basket-icon-container">
//             <img src={basketIcon} alt="Basket" className="basket-icon" />
//             <div className="dot"></div>
//           </Link>
//         </div>

//         <li>
//           <Link to="/track">Track Order</Link>
//         </li>
//         <Link to="/login">
//           <button>Sign In</button>
//         </Link>
//       </div>

//       {/* Start Group Order Button */}
//       <div className="group-order">
//         <button onClick={createGroup}>Start Group Order</button>
//         {groupId && (
//           <p>
//             Share this link: <Link to={`/group-order/${groupId}`}>Join Group Order</Link>
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



//DHRUV
// import React, { useState, useContext } from "react";
// import "./Navbar.css";
// import logo from "../../assets/logo.png";
// import searchIcon from "../../assets/search_icon.png";
// import basketIcon from "../../assets/basket_icon.png";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext";

// const Navbar = () => {
//   const [menu, setMenu] = useState("home");
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const getUserDisplay = () => {
//     if (!user) return "";
//     if (user.email === "guest") return "Guest";
//     return user.email.slice(0, 2).toUpperCase();
//   };

//   const toggleDropdown = () => {
//     setShowDropdown((prev) => !prev);
//   };

//   return (
//     <div className="navbar">
//       <Link to="/">
//         <img src={logo} alt="Logo" className="logo" />
//       </Link>

//       <ul className="navbar-menu">
//         <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
//           <Link to="/">Home</Link>
//         </li>
//         <li className={menu === "menu" ? "active" : ""}>
//           <Link to="/menu" onClick={() => setMenu("menu")}>Menu</Link>
//         </li>
//         <li className={menu === "contact-us" ? "active" : ""}>
//           <Link to="/contact-us" onClick={() => setMenu("contact-us")}>Contact Us</Link>
//         </li>
//       </ul>

//       <div className="navbar-right">
//         <img src={searchIcon} alt="Search" />
//         <div className="navbar-search-icon">
//           <Link to="/cart">
//             <img src={basketIcon} alt="Basket" />
//           </Link>
//           <div className="dot"></div>
//         </div>

//         <li>
//           <Link to="/track">Track Order</Link>
//         </li>

//         {user ? (
//           <div className="user-dropdown">
//             <span className="user-badge" onClick={toggleDropdown}>
//               {getUserDisplay()}
//             </span>
//             {showDropdown && (
//               <div className="dropdown-menu">
//                 <button onClick={handleLogout}>Logout</button>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link to="/login">
//             <button>Sign In</button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;






























//Asmita Bhavisha Dhruv
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import searchIcon from "../../assets/search_icon.png";
import basketIcon from "../../assets/basket_icon.png";
import { AuthContext } from "../../context/AuthContext";


const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [groupId, setGroupId] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getUserDisplay = () => {
    if (!user) return "";
    if (user.email === "guest") return "Guest";
    return user.email.slice(0, 2).toUpperCase();
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const createGroup = () => {
    const newGroupId = Math.random().toString(36).substring(7);
    setGroupId(newGroupId);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <li onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={menu === "menu" ? "active" : ""}>
          <Link to="/menu" onClick={() => setMenu("menu")}>Menu</Link>
        </li>
        <Link to="/create-group">Group Order</Link>
        <li className={menu === "contact-us" ? "active" : ""}>
          <Link to="/contact-us" onClick={() => setMenu("contact-us")}>Contact Us</Link>
        </li>
      </ul>

      <div className="navbar-right">
        <img src={searchIcon} alt="Search" />
        
        <div className="navbar-icons">
          <Link to="/wallet" className="wallet-icon-container">
            <svg className="wallet-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 6H21C21.5523 6 22 6.44772 22 7V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V7C2 6.44772 2.44772 6 3 6Z" stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18 10H22V14H18C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10Z" stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="19" cy="12" r="1" fill="#49557e"/>
              <path d="M6 6V4C6 3.44772 6.44772 3 7 3H17C17.5523 3 18 3.44772 18 4V6" stroke="#49557e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="dot"></div>
          </Link>

          <Link to="/cart" className="basket-icon-container">
            <img src={basketIcon} alt="Basket" className="basket-icon" />
            <div className="dot"></div>
          </Link>
        </div>

        <li>
          <Link to="/track">Track Order</Link>
        </li>

        {user ? (
          <div className="user-dropdown">
            <span className="user-badge" onClick={toggleDropdown}>
              {getUserDisplay()}
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button>Sign In</button>
          </Link>
        )}
      </div>

      
    </div>
  );
};

export default Navbar;
