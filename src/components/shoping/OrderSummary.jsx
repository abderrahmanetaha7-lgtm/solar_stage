import React from "react";
import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";

const OrderSummary = ({
  subtotal,
  totalItems,
  tax,
  total,
  isLoading,
  onCheckout,
}) => (
  <Paper sx={{ p: 4, borderRadius: 5, bgcolor: "background.paper" }}>
    <Typography variant="h5" fontWeight={700} mb={3}>
      Order Summary
    </Typography>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Typography color="text.secondary">Subtotal ({totalItems} items)</Typography>
      <Typography fontWeight={600}>${subtotal.toLocaleString()}</Typography>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      <Typography color="text.secondary">Shipping</Typography>
      <Typography color="success.main" fontWeight={600}>Free</Typography>
    </Box>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Typography color="text.secondary">Tax (0.8%)</Typography>
      <Typography fontWeight={600}>${tax.toFixed(2)}</Typography>
    </Box>
    <Divider sx={{ mb: 3 }} />
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
      <Typography variant="h6" fontWeight={700}>Total</Typography>
      <Typography variant="h5" fontWeight={800}>
        ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </Typography>
    </Box>
    <Button
      fullWidth
      variant="contained"
      onClick={onCheckout}
      disabled={isLoading}
      sx={{ py: 2, borderRadius: "16px", fontWeight: 700 }}
    >
      {isLoading ? (
        <CircularProgress size={24} sx={{ mr: 1, color: "white" }} />
      ) : (
        "Proceed to Checkout →"
      )}
    </Button>
    <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center", mt: 2 }}>
      🔒 Secure checkout · Free returns within 30 days
    </Typography>
  </Paper>
);

export default React.memo(OrderSummary);