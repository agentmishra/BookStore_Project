import logo from './logo.svg';
import './css/App.css';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Register from './Components/Register';
import NotFoundPage from './Components/NotFoundPage';
import globalStyles from './Components/Constants';
import appStyle from './css/AppStyle.module.css';
import {Routes,Route, BrowserRouter,Link} from 'react-router-dom';


function App() {
  return (
    <>
   {/* <img src={logo} alt='App Logo'/>  */}
    {/* <img src="http://localhost:3000/logo192.png"/>  */}
  <BrowserRouter> 
  <div  
  // style={{...globalStyles.navbar}}
    className={appStyle.navbar}
  > 
  <Link to='/' style={{marginLeft:5}} className='link'>Home</Link>
  <Link to='/login' style={{marginLeft:10}} className='link'>Login</Link>
  <Link to='/register' style={{marginLeft:15}} className='link'>Register Now</Link>
  <Link to='/error' style={{marginLeft:20}} className='link'>NotFoundPage</Link>
  </div>
  
  <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='*' element={<NotFoundPage/>}></Route>
 </Routes>
  </BrowserRouter> 
  </>);
    
   
  


}

export default App;
