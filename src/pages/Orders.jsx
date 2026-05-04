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
import { useTranslation } from "react-i18next";

/* ================= STATUS UI ================= */

export default function Orders() {
  const { t } = useTranslation();
  const statusConfig = {
    pending: { label: "status.pending", color: "warning" },
    confirmed: { label: "status.confirmed", color: "primary" },
    delivered: { label: "status.delivered", color: "success" },
  };
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
    if (!window.confirm(t("orders.confirmDelete"))) return;

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
        {t("orders.title")}
      </Typography>

      {NoOrders === 0 && <EmptyOrders />}

      {/* ORDERS LIST */}
      <Grid container spacing={3}>
        {orders.map((order) => {
          const status = statusConfig[order.status] || statusConfig.pending;

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={order.id}>
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
                  <Box>
                    <Typography fontWeight={700} sx={{ textAlign: "center" }}>
                      {t("orders.orderNumber")} : {order.id}
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
                      {t("orders.items")} : <b>{order.items?.length || 0}</b>
                    </Typography>

                    <Typography variant="body2" fontWeight={700}>
                      {t("orders.total")} : ${order.total} {t("orders.DH")}
                    </Typography>

                    <Typography
                      variant="body2"
                      fontWeight={700}
                      color="primary"
                    >
                      {t("orders.status")} : {t(status.label)}
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
                      {t("orders.seeDetails")}
                    </Button>
                    <Button
                      sx={{ width: "100%", borderRadius: "10px" }}
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(order.id)}
                    >
                      {t("orders.deleteOrder")}
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
