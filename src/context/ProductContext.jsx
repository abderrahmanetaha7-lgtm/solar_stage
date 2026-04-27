import React, { createContext, useContext, useState, useEffect } from "react";
import sol1 from "../assets/images/sol1.webp";
import sol2 from "../assets/images/sol2.webp";
import sol3 from "../assets/images/sol3.webp";
import sol4 from "../assets/images/sol4.webp";
import sol5 from "../assets/images/sol5.webp";
import sol6 from "../assets/images/sol6.webp";
import sol7 from "../assets/images/sol7.webp";
import sol8 from "../assets/images/sol8.jpg";

// Create the Product Context
const ProductContext = createContext();

// Product Provider Component - Wraps app to provide product state management
export const ProductProvider = ({ children }) => {
  // State for storing products array
  const [products, setProducts] = useState([]);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // State for error handling
  const [error, setError] = useState(null);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching

        // Simulate API delay (500ms)
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Initial product data (would normally come from an API)
        const initialProducts = [
          {
            id: 1,
            name: "SolarMax Pro 400W",
            price: 899,
            image: sol1,
            category: "inverters",
            efficiency: "22.8%",
            description:
              "Panneau solaire haut de gamme avec technologie avancée pour produire plus d’énergie. Idéal pour les maisons et les entreprises.",
            createdAt: "2026-04-20T10:00:00Z",
          },
          {
            id: 2,
            name: "EcoPanel Ultra 350W",
            price: 749,
            image: sol2,
            category: "batteries",
            efficiency: "21.3%",
            description:
              "Panneau solaire efficace et écologique. Il résiste bien aux mauvaises conditions météo.",
            createdAt: "2026-04-19T10:00:00Z",
          },
          {
            id: 3,
            name: "SunPower Elite 500W",
            price: 1099,
            image: sol3,
            category: "panels",
            efficiency: "23.5%",
            description:
              "Panneau solaire très puissant pour produire beaucoup d’énergie. Garantie de 25 ans.",
            createdAt: "2026-04-18T10:00:00Z",
          },
          {
            id: 4,
            name: "HomeSolar Basic 300W",
            price: 599,
            image: sol4,
            category: "panels",
            efficiency: "19.8%",
            description:
              "Solution solaire simple et pas chère pour la maison. Facile à installer et fiable.",
            createdAt: "2026-04-17T10:00:00Z",
          },
          {
            id: 5,
            name: "Onduleur Solaire Pro",
            price: 1299,
            image: sol5,
            category: "batteries",
            efficiency: "98%",
            description:
              "Onduleur intelligent avec WiFi et batterie. Permet de mieux gérer l’énergie solaire.",
            createdAt: "2026-04-16T10:00:00Z",
          },
          {
            id: 6,
            name: "Onduleur Solaire Pro",
            price: 1299,
            image: sol6,
            category: "inverters",
            efficiency: "98%",
            description:
              "Onduleur intelligent avec WiFi et batterie. Permet de mieux gérer l’énergie solaire.",
            createdAt: "2026-04-16T10:00:00Z",
          },
          {
            id: 7,
            name: "Onduleur Solaire Pro",
            price: 1299,
            image: sol7,
            category: "batteries",
            efficiency: "98%",
            description:
              "Onduleur intelligent avec WiFi et batterie. Permet de mieux gérer l’énergie solaire.",
            createdAt: "2026-04-16T10:00:00Z",
          },
          {
            id: 8,
            name: "Onduleur Solaire Pro",
            price: 1299,
            image: sol8,
            category: "panels",
            efficiency: "98%",
            description:
              "Onduleur intelligent avec WiFi et batterie. Permet de mieux gérer l’énergie solaire.",
            createdAt: "2026-04-16T10:00:00Z",
          },
        ];

        setProducts(initialProducts); // Set products to state
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Échec du chargement des produits"); // Set error message
        console.error(err); // Log error to console
      } finally {
        setLoading(false); // Always set loading to false when done
      }
    };

    fetchProducts(); // Call the fetch function
  }, []); // Empty dependency array - runs only once on mount

  // Add new product
  const addProduct = (newProduct) => {
    // Calculate new ID (max existing ID + 1)
    const maxId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;
    setProducts((prev) => [
      ...prev, // Spread existing products
      {
        ...newProduct, // Spread new product data
        id: maxId + 1, // Assign new ID
        createdAt: new Date().toISOString(), // Add current timestamp
      },
    ]);
  };

  // Update existing product by ID
  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map(
        (product) =>
          product.id === id ? { ...product, ...updatedProduct } : product, // Replace matching product, keep others
      ),
    );
  };

  // Delete product by ID
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id)); // Keep all products except the one with matching ID
  };

  // Provide context value to children components
  return (
    <ProductContext.Provider
      value={{
        products, // Array of products
        loading, // Loading state
        error, // Error state
        addProduct, // Function to add product
        updateProduct, // Function to update product
        deleteProduct, // Function to delete product
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom Hook for using products context
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext); // Get context value
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider"); // Error if used outside provider
  }
  return context; // Return context value
};
