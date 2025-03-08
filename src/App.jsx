import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';
import Header from './components/Header/Header.jsx';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Cart/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx';
import AppDownload from './components/AppDownload/AppDownload.jsx';
import Footer from './components/Footer/Footer.jsx';
import AdminPanel from "./components/AdminPanel/AdminPanel.jsx";
import Login from "./components/Login.jsx";
import AdminRoute from "./components/AdminRoute.jsx"; 
import Tracking from "./components/Tracking.jsx";
import EmailForm from "./components/EmailForm.jsx";
import ExploreMenu from "./components/ExploreMenu/ExploreMenu.jsx";
import Menu from "./components/Menu/Menu.jsx";



const App = () => {
  return (
    <>
      <div className='app'>
        <Navbar />
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<AdminRoute element={<AdminPanel />} />} />
          <Route path='/track' element={<Tracking />} /> 
          <Route path="/contact-us" element={<EmailForm />} />
          <Route path="/explore-menu" element={<ExploreMenu />} />
          <Route path="/menu" element={<Menu />} />
          
        
        </Routes>
      </div>
      <AppDownload />
      <Footer />
    </>
  );
};

export default App;