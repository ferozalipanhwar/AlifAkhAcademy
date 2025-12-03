import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);
  

 const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  setUser(null);
  window.location.href = "/";
};


  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
