import React, { createContext, useContext, useState, useEffect } from "react";
import sol1  from "../assets/images/sol1.webp";
import sol2  from "../assets/images/sol2.webp";
import sol3  from "../assets/images/sol3.webp";
import sol4  from "../assets/images/sol4.webp";
// إنشاء الكونتكست
const ProductContext = createContext();

// Provider
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب المنتجات الافتراضية (يمكن استبدالها بـ API حقيقي)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // محاكاة تحميل البيانات من API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const initialProducts = [
          {
            id: 1,
            name: "SolarMax Pro 400W",
            price: 899,
            image: sol1,
            category: "PANELS",
            efficiency: "22.8%",
            description: "Premium monocrystalline solar panel with advanced cell technology for maximum energy output. Perfect for residential and commercial use.",
            createdAt: "2026-04-20T10:00:00Z",
          },
          {
            id: 2,
            name: "EcoPanel Ultra 350W",
            price: 749,
            image: sol2 ,
            category: "PANELS",
            efficiency: "21.3%",
            description: "High-efficiency panel with eco-friendly manufacturing process and enhanced durability in harsh weather conditions.",
            createdAt: "2026-04-19T10:00:00Z",
          },
          {
            id: 3,
            name: "SunPower Elite 500W",
            price: 1099,
            image: sol3,
            category: "PANELS",
            efficiency: "23.5%",
            description: "Ultra-high efficiency solar panel for maximum power generation. Features advanced cell technology and 25-year warranty.",
            createdAt: "2026-04-18T10:00:00Z",
          },
          {
            id: 4,
            name: "HomeSolar Basic 300W",
            price: 599,
            image: sol4,
            category: "PANELS",
            efficiency: "19.8%",
            description: "Affordable solar solution for residential use. Easy installation and reliable performance for everyday energy needs.",
            createdAt: "2026-04-17T10:00:00Z",
          },
          {
            id: 5,
            name: "Solar Inverter Pro",
            price: 1299,
            image: "https://images.unsplash.com/photo-1572984984010-6c6e6a08b9b3?w=500&h=300&fit=crop",
            category: "INVERTERS",
            efficiency: "98%",
            description: "Smart hybrid inverter with WiFi monitoring and battery-ready design. Maximize your solar investment.",
            createdAt: "2026-04-16T10:00:00Z",
          },
        ];
        
        setProducts(initialProducts);
        setError(null);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product function
  const addProduct = (newProduct) => {
    const maxId = products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    setProducts((prev) => [
      ...prev, 
      { 
        ...newProduct, 
        id: maxId + 1, 
        createdAt: new Date().toISOString() 
      }
    ]);
  };

  // Update product function
  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  // Delete product function
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
