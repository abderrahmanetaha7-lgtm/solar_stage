// ShoppingCart.jsx

import { useState } from "react";

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";

import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import EmptyCart from "../components/cart/EmptyCart";

import useCart from "../hooks/useCart";

import { useTranslation } from "react-i18next";

export default function ShoppingCart() {
  const { cartItems, totalArticles, clear } = useCart();

  const { t } = useTranslation();

  const [openClearDialog, setOpenClearDialog] = useState(false);

  const handleOpenClearDialog = () => {
    setOpenClearDialog(true);
  };

  const handleCloseClearDialog = () => {
    setOpenClearDialog(false);
  };

  const handleConfirmClear = () => {
    clear();

    setOpenClearDialog(false);
  };

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          py: 8,
          mt: 3,
          minHeight: "100vh",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            display: "flex",

            justifyContent: "space-between",

            alignItems: {
              xs: "flex-start",
              sm: "center",
            },

            flexDirection: {
              xs: "column",
              sm: "row",
            },

            gap: 2,

            mb: 4,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,

              fontSize: {
                xs: "1.5rem",
                md: "2rem",
              },
            }}
          >
            {t("cart.title", {
              count: totalArticles,
            })}
          </Typography>

          <Button
            color="error"
            variant="outlined"
            onClick={handleOpenClearDialog}
            sx={{
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            {t("cart.clearCart")}
          </Button>
        </Box>

        {/* CONTENT */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <CartList />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CartSummary />
          </Grid>
        </Grid>
      </Container>

      {/* CLEAR CART DIALOG */}
      <Dialog open={openClearDialog} onClose={handleCloseClearDialog}>
        <DialogTitle>Clear Cart</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear your cart?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseClearDialog}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmClear}
          >
            Clear
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
