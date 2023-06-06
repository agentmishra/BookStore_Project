import logo from './logo.svg';
import './css/App.css';
import EditUser from './Pages/EditUser';
import globalStyles from './Components/Constants';
import appStyle from './css/AppStyle.module.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import { AuthProvider, useAuthContext } from './contexts/auth';
import LoginProvider from './contexts/Loginprovider';
import { AuthContext } from './contexts/auth';
import { useContext } from 'react';
import Footer from './Components/Footer';
import UpdateProfile from './Pages/UpdateProfile';
import { loginContext } from './contexts/LoginContext';
import loader from '../src/assets/Loader-Icon.gif';
import '../src/css/loader.css';
import { MainNavigation } from './MainNavigation';
import { CartProvider } from './contexts/cartContext';
// import { MainNavigation } from './Components/MainNavigation';


function App() {
  // const authContext = useAuthContext();
  
  return (
    <>
      
      <ToastContainer />
      <BrowserRouter>
      <LoginProvider>
        <AuthProvider>
        <CartProvider>
        <div>
        <div className="loader-wrapper">
                <img src={loader} alt="loader" />
        </div>
        </div>
        <Header />
        {/* {JSON.stringify(useAuthContext().user)} */}
        <MainNavigation/>
        <Footer/>
        </CartProvider>
        </AuthProvider>
        </LoginProvider>
      </BrowserRouter>
     
      
      
      
      
    </>);





}

export default App;
