import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add product to cart
  const addToCart = useCallback((product) => {
    setCartItems((prev) => {
      const exist = prev.find((item) => item.id === product.id);

      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.maxQuantity || 10),
              }
            : item
        );
      }

      // Normalize product image
      let productImage = "";
      if (product.image) {
        productImage = Array.isArray(product.image)
          ? product.image[0]
          : product.image;
      } else {
        productImage = "https://via.placeholder.com/500x300?text=No+Image";
      }

      // Add new product
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: productImage,
          quantity: 1,
          maxQuantity: product.maxQuantity || 10,
          category: product.category || "GENERAL",
          description: product.description || "",
          efficiency: product.efficiency || "0%",
        },
      ];
    });
  }, []);

  // Remove item from cart
  const removeFromCart = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id, type) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (type === "inc") {
          return {
            ...item,
            quantity: Math.min(item.quantity + 1, item.maxQuantity || 10),
          };
        }

        if (type === "dec") {
          return {
            ...item,
            quantity: Math.max(item.quantity - 1, 1),
          };
        }

        return item;
      })
    );
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      setCartItems([]);
    }
  }, []);

  // Total items count
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook to use cart context
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};