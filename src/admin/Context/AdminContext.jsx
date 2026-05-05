import React, { createContext, useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getOrders,
  updateOrderStatus as apiUpdateOrderStatus,
  getUsers,
  updateUser,
  deleteUser,
} from "../../api/adminApi";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  // const [settings, setSettings] = useState(null);

  /* ================= SETTINGS ================= */

  // const fetchSettings = async () => {
  //   try {
  //     const res = await API.get("/settings");
  //     setSettings(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const updateSettings = async (data) => {
  //   try {
  //     const res = await API.post("/settings", data);
  //     setSettings(res.data);
  //     return res.data;
  //   } catch (err) {
  //     console.error(err);
  //     throw err;
  //   }
  // };

  /* ================= LOAD DATA FROM LARAVEL ================= */

  const fetchAll = async () => {
    try {
      setLoading(true);

      const p = await getProducts();
      const o = await getOrders();
      const u = await getUsers();

      setProducts(p.data);
      setOrders(o.data);
      setUsers(u.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  /* ================= PRODUCTS ================= */

  const addProduct = async (product) => {
    try {
      const res = await createProduct(product);
      setProducts((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const updateProductById = async (id, data) => {
    const res = await updateProduct(id, data);

    setProducts((prev) => prev.map((p) => (p.id === id ? res.data : p)));
  };

  const deleteProductById = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  /* ================= ORDERS ================= */

  const updateOrderStatus = async (id, status) => {
    const res = await apiUpdateOrderStatus(id, status);

    setOrders((prev) => prev.map((o) => (o.id === id ? res.data : o)));
  };

  /* ================= USERS ================= */

  const updateUserById = async (id, data) => {
    const res = await updateUser(id, data);

    setUsers((prev) => prev.map((u) => (u.id === id ? res.data : u)));
  };

  const deleteUserById = async (id) => {
    await deleteUser(id);

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        orders,
        users,
        loading,

        addProduct,
        updateProduct: updateProductById,
        deleteProduct: deleteProductById,

        updateOrderStatus,

        updateUser: updateUserById,
        deleteUser: deleteUserById,

        refetch: fetchAll,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
