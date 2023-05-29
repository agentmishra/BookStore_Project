import logo from './logo.svg';
import './css/App.css';
import HomePage from './Pages/HomePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import NotFoundPage from './Pages/NotFoundPage';
import globalStyles from './Components/Constants';
import appStyle from './css/AppStyle.module.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Components/Header';



function App() {
  // const authcontext=useAuthContext();
  // const Redirect=<Navigate to='/login'/>;
  return (
    <>
      
      <ToastContainer />
      <BrowserRouter>
        {/* <div
          // style={{...globalStyles.navbar}}
          className={appStyle.navbar}
        >
          <Link to='/' style={{ marginLeft: 5 }} className='link'>Home</Link>
          <Link to='/login' style={{ marginLeft: 10 }} className='link'>Login</Link>
          <Link to='/register' style={{ marginLeft: 15 }} className='link'>Register Now</Link>
          <Link to='/error' style={{ marginLeft: 20 }} className='link'>NotFoundPage</Link>
        </div> */}
        <Header />
       
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='*' element={<NotFoundPage />}></Route>
        </Routes>
      </BrowserRouter>
      
    </>);





}

export default App;
