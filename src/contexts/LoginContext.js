import { createContext } from "react";
const intialValues = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
  };
  
  const initialState = {
    setUser: () => {},
    user: intialValues,
    signOut: () => {},
    appInitialize: false,
  };
export const loginContext=createContext(initialState);

