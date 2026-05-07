import { Paper, Typography, Box, Divider } from "@mui/material";

export default function OrderSummary({
  subtotal,
  tax,
  shipping,
  total,
  cartItems,
  t,
}) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5">{t("checkout.summary")}</Typography>

      <Box mt={2}>
        <Typography>{t("checkout.itemsCount", { count: cartItems.length })}</Typography>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography>{t("checkout.subtotal")}</Typography>
          <Typography>${subtotal}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography>{t("checkout.tax")}</Typography>
          <Typography>${tax}</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Typography>{t("checkout.shipping")}</Typography>
          <Typography>${shipping}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6">{t("checkout.total")}</Typography>
          <Typography variant="h6">${total}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}