import logo from './logo.svg';
import './css/App.css';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import NotFoundPage from './Pages/NotFoundPage';
import ProductPage from './Pages/ProductPage';
import EditBook from './Pages/EditBook';
import BookList from './Pages/BookList';
import User from './Pages/User';
import EditUser from './Pages/EditUser';
import globalStyles from './Components/Constants';
import appStyle from './css/AppStyle.module.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';
import { AuthProvider } from './contexts/auth';
import LoginProvider from './contexts/Loginprovider';
import Footer from './Components/Footer';
import UpdateProfile from './Pages/UpdateProfile';



function App() {
  // const authcontext=useAuthContext();
  // const Redirect=<Navigate to='/login'/>;
  return (
    <>
      
      <ToastContainer />
      <BrowserRouter>
      <LoginProvider>
      <AuthProvider>
        <Header />
        
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/product' element={<ProductPage/>}></Route>
          <Route path='/edit' element={<EditBook/>}></Route>
          <Route path='/bookList' element={<BookList/>}></Route>
          <Route path='/user' element={<User/>}></Route>
          <Route path='/edit-user' element={<EditUser/>}></Route>
          <Route path='/update-profile' element={<UpdateProfile/>}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
        <Footer/>
      
        </AuthProvider>
        </LoginProvider>
      </BrowserRouter>
     
      
      
      
      
    </>);





}

export default App;
