import { Route, Routes } from "react-router-dom";
import AdminLayout from "../admin/layout/AdminLayout";
import Dashboard from "../admin/pages/Dashboard";
import ProductsPage from "../admin/pages/Products";
import OrdersPage from "../admin/pages/Orders";
import UsersPage from "../admin/pages/User";
import InventoryPage from "../admin/pages/Inventory";
import AnalyticsPage from "../admin/pages/Analytics";
import SettingsPage from "../admin/pages/Settings";
import AddOrEditProduct from "../admin/components/forms/CreateProduct";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="inventory" element={<InventoryPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="add-product" element={<AddOrEditProduct />} />
        <Route path="edit-product/:id" element={<AddOrEditProduct />} />
      </Route>
    </Routes>
  );
}
