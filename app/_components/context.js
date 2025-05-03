"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [shopCart, setShopCart] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem("cart");
    setShopCart(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  function handleShopCart(data) {
    localStorage.setItem("cart", JSON.stringify(data));
    setShopCart([...data]); // مقدار جدید را تنظیم می‌کنیم
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        shopCart,
        handleLogin,
        handleLogout,
        handleShopCart,
        isLoginOpen,
        setIsLoginOpen,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser باید داخل UserProvider استفاده شود");
  }
  return context;
}

export { useUser, UserProvider };
