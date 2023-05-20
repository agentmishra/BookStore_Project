import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage';
import Login from './Login';
import Register from './Register';
import NotFoundPage from './NotFoundPage';
import globalStyles from './Constants';
import appStyle from './AppStyle.module.css';
import {Routes,Route, BrowserRouter,Link} from 'react-router-dom';


function App() {
  return(
    <>
    {/* <img src={logo} alt='App Logo'/> */}
    <img src={`${process.env.REACT_APP_URL}logo192.png`} alt='App Logo'/>
  <BrowserRouter> 
  <div  
  // style={{...globalStyles.navbar}}
    className={appStyle.navbar}
  >
  <Link to='/' style={{marginLeft:5}}>Home</Link>
  <Link to='/login' style={{marginLeft:10}}>Login</Link>
  <Link to='/register' style={{marginLeft:15}}>Register Now</Link>
  <Link to='/error' style={{marginLeft:20}}>NotFoundPage</Link>
  </div>
  <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='*' element={<NotFoundPage/>}></Route>

  </Routes>
  </BrowserRouter>
  </>
  );

}

export default App;
