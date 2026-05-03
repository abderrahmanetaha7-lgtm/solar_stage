import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useTranslation } from "react-i18next";

const OrderConfirmation = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  if (!order) {
    navigate("/products");
    return null;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 6, mt: 3 }}>
      <Paper sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
        <CheckCircleIcon
          sx={{ fontSize: 80, color: "success.main", mb: 2 }}
        />

        <Typography variant="h4" fontWeight={800} gutterBottom>
          {t("orderConfirmation.title")} 🎉
        </Typography>

        {/* ✅ FIX paragraph */}
        <Typography color="text.secondary" component="p" sx={{ mb: 2 }}>
          {t("orderConfirmation.message")}
        </Typography>

        <Paper
          sx={{
            p: 3,
            bgcolor: "background.default",
            mt: 3,
            textAlign: "left",
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            gutterBottom
            align="center"
          >
            {t("orderConfirmation.orderNumber", { id: order.id })}
          </Typography>

          <Typography
            color="text.secondary"
            gutterBottom
            align="center"
          >
            {formatDate(order.orderDate)}{" "}
            {t("orderConfirmation.at")}{" "}
            {formatTime(order.orderDate)}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            📦 {t("orderConfirmation.orderSummary")}
          </Typography>

          {order.items.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Typography>
                {item.name} x {item.quantity}
              </Typography>
              <Typography>
                ${(item.price * item.quantity).toLocaleString()}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>{t("orderConfirmation.subtotal")}</Typography>
            <Typography>${order.subtotal.toLocaleString()}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>{t("orderConfirmation.tax")}</Typography>
            <Typography>${order.tax.toFixed(2)}</Typography>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>{t("orderConfirmation.shipping")}</Typography>
            <Typography>
              {order.shipping === 0
                ? t("orderConfirmation.free")
                : `$${order.shipping.toFixed(2)}`}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              {t("orderConfirmation.total")}
            </Typography>
            <Typography
              variant="h6"
              fontWeight={700}
              color="primary"
            >
              ${order.total.toFixed(2)}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            🚚 {t("orderConfirmation.shippingInfo")}
          </Typography>

          <Typography>
            {order.customer.firstName} {order.customer.lastName}
          </Typography>
          <Typography>{order.customer.address}</Typography>
          <Typography>
            {order.customer.city}, {order.customer.postalCode}
          </Typography>
          <Typography>{order.customer.country}</Typography>

          <Typography sx={{ mt: 1 }}>
            📧 {order.customer.email}
          </Typography>
          <Typography>
            📞 {order.customer.phone}
          </Typography>
        </Paper>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/products")}
          >
            {t("orderConfirmation.continueShopping")}
          </Button>

          <Button
            variant="outlined"
            size="large"
            onClick={() => window.print()}
          >
            {t("orderConfirmation.printReceipt")}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation;