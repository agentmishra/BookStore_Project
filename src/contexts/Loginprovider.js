import React, { useState } from 'react';
import { loginContext } from './LoginContext';
const LoginProvider=(props)=>{
    const [login,setLogin]=useState(false);
    return(
        <loginContext.Provider value={{login,setLogin}}>
            {props.children}
        </loginContext.Provider>
    );
}
export default LoginProvider;