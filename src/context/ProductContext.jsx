import React, { createContext, useContext, useState, useEffect } from "react";
import sol1 from "../assets/images/sol1.webp";
import sol2 from "../assets/images/sol2.webp";
import sol3 from "../assets/images/sol3.webp";
import sol4 from "../assets/images/sol4.webp";
import sol5 from "../assets/images/sol5.webp";
import sol6 from "../assets/images/sol6.webp";
import sol7 from "../assets/images/sol7.webp";
import sol8 from "../assets/images/sol8.jpg";

// Create context
const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        const initialProducts = [
          {
            id: 1,
            name: "SolarMax Pro 400W",
            price: 899,
            image: [sol1, sol6],
            category: "inverters",
            disponibility: false,
            efficiency: 22.8,
            description:
              "Panneau solaire haut de gamme avec technologie avancée pour produire plus d’énergie. Idéal pour les maisons et les entreprises.",
            createdAt: "2026-04-16",
          },
          {
            id: 2,
            name: "EcoPanel Ultra 350W",
            price: 749,
            image: [sol2, sol5, sol7],
            category: "batteries",
            disponibility: false,
            efficiency: 21.3,
            description:
              "Panneau solaire efficace et écologique. Il résiste bien aux mauvaises conditions météo.",
            createdAt: "2026-04-16",
          },
          {
            id: 3,
            name: "SunPower Elite 500W",
            price: 1099,
            image: [sol8, sol3, sol4],
            category: "panels",
            disponibility: false,
            efficiency: 23.5,
            description:
              "Panneau solaire très puissant pour produire beaucoup d’énergie. Garantie de 25 ans.",
            createdAt: "2026-04-16",
          },
          {
            id: 4,
            name: "HomeSolar Basic 300W",
            price: 599,
            image: [sol8, sol3, sol4],
            category: "panels",
            disponibility: false,
            efficiency: 19.8,
            description:
              "Solution solaire simple et pas chère pour la maison. Facile à installer et fiable.",
            createdAt: "2026-04-16",
          },
          {
            id: 5,
            name: "Onduleur Solaire Pro",
            price: 1299,
            image: [sol2, sol5, sol7],
            category: "batteries",
            disponibility: true,
            efficiency: 98,
            description:
              "Onduleur intelligent avec WiFi et batterie. Permet de mieux gérer l’énergie solaire.",
            createdAt: "2026-04-16",
          },
          {
            id: 6,
            name: "Onduleur Solaire Pro",
            price: 1299,
            image: [sol1, sol6],
            category: "inverters",
            disponibility: true,
            efficiency: 98,
            description:
              "Onduleur intelligent avec WiFi et batterie. Permet de mieux gérer l’énergie solaire.",
            createdAt: "2026-04-16",
          },
          {
            id: 7,
            name: "Onduleur Solaire Pro",
            price: 1299,
            image: [sol2, sol5, sol7],
            category: "batteries",
            disponibility: true,
            efficiency: 98,
            description:
              "Onduleur intelligent avec WiFi et batterie. Permet de mieux gérer l’énergie solaire.",
            createdAt: "2026-04-16",
          },
          {
            id: 8,
            name: "Onduleur Solaire Pro",
            price: 1299,
            image: [sol8, sol3, sol4],
            category: "panels",
            disponibility: true,
            efficiency: 98,
            description:
              "Onduleur intelligent avec WiFi et batterie. Permet de mieux gérer l’énergie solaire.",
            createdAt: "2026-04-16",
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

  // Add product
  const addProduct = (newProduct) => {
    const maxId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;

    setProducts((prev) => [
      ...prev,
      {
        ...newProduct,
        id: maxId + 1,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  // Update product
  const updateProduct = (id, updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  // Delete product
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

// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};