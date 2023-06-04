import React, { useState } from 'react';
import { createContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';

const intialValues = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
  }
  const initialState = {
    setUser: () => {},
    user: intialValues,
    signOut: () => {},
    appInitialize: false,
  };
  export const AuthContext = createContext(initialState);
  
  const Role = {
    Admin: 1,
    Seller: 2,
    Buyer: 3,
  };
  const NavigationItems = [
    {
      // name: "Users",
      // route: '/user',
      // access: [Role.Admin],
    },
    {
      name: "Categories",
      route: '/category',
      access: [Role.Admin,Role.Buyer,Role.Seller],
    },
    {
      name: "Books",
      route: '/bookList',
      access: [Role.Admin, Role.Seller,Role.Buyer],
    },
    {
      name: "Update Profile",
      route: '/update-profile',
      access: [Role.Admin, Role.Buyer, Role.Seller],
    },
  ];
  const hasAccess = (pathname, user) => {
    const navItem = NavigationItems.find((navItem) =>
      pathname.includes(navItem.route)
    );
    if (navItem) {
      return (
        !navItem.access ||
        !!(navItem.access && navItem.access.includes(user.roleId))
      );
    }
    return true;
  };

 export const AuthProvider=({children})=>{
    const [appInitialize, setAppInitialize] = useState(false);
    const [user, _setUser] = useState(intialValues);
    const [login,setLogin]=useState(false);
    const Navigate=useNavigate();
    const {pathname}=useLocation();

    const setUser = (user) => {
      console.log(user);
      // localStorage.setItem("user", JSON.stringify(user));
      _setUser(user);
    };
    useEffect(() => {
      const itemStr = 
      // JSON.parse(localStorage.getItem("user")) ||
       intialValues;
        if (!itemStr.id) {
        Navigate('/login');
      }
      _setUser(itemStr);
    }, []);
    const signOut = () => {
      setUser(intialValues);
      // localStorage.removeItem("user");
      Navigate("/login");
    };
  

    useEffect(() => {
      if (pathname === '/login' && user.id) {
        Navigate('/booklist');
      }
  
      if (!user.id) {
        return;
      }
      // const access = hasAccess(pathname, user);
      // if (!access) {
      //   toast.warning("Sorry, you are not authorized to access this page");
      //   Navigate('/bookList');
      //   return;
      // }
      setAppInitialize(true);
    }, [pathname, user]);
    let value = {
      user,
      setUser,
      signOut,
      appInitialize,

    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }

  export const useAuthContext = () => {
    return useContext(AuthContext);
  };
  