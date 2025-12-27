/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('caverse_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('caverse_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (course) => {
    setCart((prevCart) => {
      // Check if course already exists in cart
      const existingItem = prevCart.find((item) => item.id === course.id);
      
      if (existingItem) {
        // If exists, increase quantity
        return prevCart.map((item) =>
          item.id === course.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new, add with quantity 1
        return [...prevCart, { ...course, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (courseId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== courseId));
  };

  const updateQuantity = (courseId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(courseId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === courseId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};