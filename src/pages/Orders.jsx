import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Divider,
  Button,
  Tabs,
  Tab,
  IconButton,
  Grid,
} from "@mui/material";

import {
  Receipt,
  LocalShipping,
  CheckCircle,
  Cancel,
  Pending,
  Visibility,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import EmptyOrders from "../components/Order/EmptyOrders";

/* ================= STATUS UI ================= */

const statusConfig = {
  pending: { label: "Pending", icon: <Pending />, color: "warning" },
  processing: { label: "Processing", icon: <Receipt />, color: "info" },
  shipped: { label: "Shipped", icon: <LocalShipping />, color: "primary" },
  delivered: { label: "Delivered", icon: <CheckCircle />, color: "success" },
  cancelled: { label: "Cancelled", icon: <Cancel />, color: "error" },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  /* ================= LOAD FROM LOCALSTORAGE ================= */

  useEffect(() => {
    const loadOrders = () => {
      const saved = localStorage.getItem("orders");
      setOrders(saved ? JSON.parse(saved) : []);
    };

    loadOrders();

    window.addEventListener("ordersUpdated", loadOrders);

    return () => {
      window.removeEventListener("ordersUpdated", loadOrders);
    };
  }, []);

  const NoOrders = orders.length;

 

  const handleDelete = (id) => {
  if (!window.confirm("Are you sure you want to delete this order?")) return;

  const updatedOrders = orders.filter((order) => order.id !== id);
  setOrders(updatedOrders);
  localStorage.setItem("orders", JSON.stringify(updatedOrders));
};

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        width: { xs: "95%", md: "80%" },
        mx: "auto",
        mt: 8,
      }}
    >
      {/* TITLE */}
      <Typography variant="h5" fontWeight={700} mb={2}>
        Your Orders
      </Typography>

      {NoOrders === 0 && <EmptyOrders />}

      {/* ORDERS LIST */}
      <Grid container spacing={3}>
        {orders.map((order) => {
          const status = statusConfig[order.status] || statusConfig.pending;

          return (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card
                sx={{
                  mt: 2,
                  width: "100%",
                  borderRadius: 3,
                  transition: "0.2s",
                  "&:hover": { transform: "translateY(-3px)" },
                }}
              >
                <CardContent>
                  {/* HEADER */}
                  <Box display="flex" justifyContent="space-between">
                    <Typography fontWeight={700} sx={{ textAlign: "center" }}>
                      Order #{order.id}
                    </Typography>

                    <Typography
                      sx={{ textAlign: "center", opacity: 0.5 }}
                      color="text.secondary"
                    >
                      {new Date(order.orderDate).toLocaleString()}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    {/* INFO */}
                    <Typography variant="body2">
                      Items: <b>{order.items?.length || 0}</b>
                    </Typography>

                    <Typography variant="body2" fontWeight={700}>
                      Total: ${order.total}
                    </Typography>

                    <Typography variant="body2" fontWeight={700}>
                      Status : {status.label}
                    </Typography>
                  </Box>

                  {/* ACTIONS */}
                  <Box
                    sx={{
                      mt: 2,
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Button
                      sx={{ width: "100%", borderRadius: "10px" }}
                      variant="outlined"
                      onClick={() => navigate(`/orders-detail/${order.id}`)}
                    >
                      See Details
                    </Button>
                    <Button
                      sx={{ width: "100%", borderRadius: "10px" }}
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(order.id)}
                    >
                      Delete Order
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
