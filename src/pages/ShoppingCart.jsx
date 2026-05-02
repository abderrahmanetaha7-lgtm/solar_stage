import React from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Delete from "@mui/icons-material/Delete";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { useTranslation } from "react-i18next";

const ShoppingCart = ({ onCheckout }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [itemToDelete, setItemToDelete] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageErrors, setImageErrors] = React.useState({});

  const sousTotal = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const taxe = React.useMemo(() => sousTotal * 0.008, [sousTotal]);
  const total = React.useMemo(() => sousTotal + taxe, [sousTotal, taxe]);

  const totalArticles = React.useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const handleIncrement = React.useCallback((itemId) => {
    updateQuantity(itemId, "inc");
  }, [updateQuantity]);

  const handleDecrement = React.useCallback((itemId) => {
    updateQuantity(itemId, "dec");
  }, [updateQuantity]);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = React.useCallback(() => {
    if (itemToDelete) {
      removeFromCart(itemToDelete.id);
    }
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  }, [itemToDelete, removeFromCart]);

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setItemToDelete(null);
  };

  const handleClearCart = React.useCallback(() => {
    if (window.confirm(t("cart.confirmClear"))) {
      clearCart();
    }
  }, [clearCart, t]);

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({
      ...prev,
      [itemId]: true,
    }));
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      if (onCheckout) {
        await onCheckout(cartItems);
      } else {
        localStorage.setItem("cart", JSON.stringify(cartItems));
        navigate('/checkout', { state: { cartItems } });
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getImageUrl = (item) => {
    if (imageErrors[item.id]) {
      return "https://via.placeholder.com/500x300?text=Image+Not+Found";
    }
    
    if (item.image) {
      if (Array.isArray(item.image)) {
        return item.image[0];
      }
      return item.image;
    }
    
    return "https://via.placeholder.com/500x300?text=No+Image";
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, mt: 3 }}>
        <Box
          sx={{
            textAlign: "center",
            py: 8,
          }}
        >
          <ShoppingCartOutlined
            sx={{
              fontSize: 80,
              color: "text.secondary",
              mb: 2,
              opacity: 0.5,
            }}
          />
          <Typography variant="h5" fontWeight={700} gutterBottom>
            {t("cart.emptyTitle")}
          </Typography>
          <Typography color="text.secondary" mb={4}>
            {t("cart.emptyMessage")}
          </Typography>
          <Button
            variant="contained"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: "16px",
              fontWeight: 700,
              textTransform: "none",
            }}
            href="/products"
          >
            {t("cart.continueShopping")}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6, mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight={800}>
          {t("cart.title", { count: totalArticles })}
        </Typography>
        <Button
          color="inherit"
          onClick={handleClearCart}
          sx={{
            textTransform: "none",
            fontWeight: 600,
          }}
        >
          {t("cart.clearCart")}
        </Button>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {cartItems.map((item) => {
              const sousTotalArticle = item.price * item.quantity;
              const imageUrl = getImageUrl(item);
              
              return (
                <Paper
                  key={item.id}
                  sx={{
                    p: 4,
                    borderRadius: 5,
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 3,
                    bgcolor: "background.paper",
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? "0 10px 30px rgba(0,0,0,0.6)"
                        : "0 15px 40px rgba(0,0,0,0.06)",
                    transition: "all 0.2s ease-in-out",
                    "&:hover": {
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? "0 15px 40px rgba(0,0,0,0.8)"
                          : "0 20px 50px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      width: "100%",
                    }}
                  >
                    <Box
                      component="img"
                      src={imageUrl}
                      alt={item.name}
                      onError={() => handleImageError(item.id)}
                      sx={{
                        width: 100,
                        height: 110,
                        borderRadius: 4,
                        objectFit: "cover",
                        bgcolor: "grey.200",
                      }}
                    />

                    <Box>
                      <Typography variant="h6" fontWeight={700}>
                        {item.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        ${item.price.toLocaleString()}
                      </Typography>
                      {item.category && (
                        <Typography variant="caption" color="text.secondary">
                          {item.category}
                        </Typography>
                      )}
                      {item.quantity > 5 && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: "warning.main",
                            fontWeight: 600,
                            mt: 0.5,
                            display: "block",
                          }}
                        >
                          {t("cart.bulkDiscount")}
                        </Typography>
                      )}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      width: isMobile ? "100%" : "auto",
                      justifyContent: isMobile ? "space-between" : "flex-end",
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        onClick={() => handleDecrement(item.id)}
                        disabled={item.quantity <= 1}
                        aria-label={t("cart.decrementAriaLabel", { name: item.name })}
                        sx={{
                          bgcolor: "action.hover",
                          "&:hover": {
                            bgcolor: "action.selected",
                          },
                        }}
                      >
                        <Remove />
                      </IconButton>

                      <Typography
                        fontWeight={700}
                        fontSize={18}
                        sx={{ minWidth: 30, textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>

                      <IconButton
                        onClick={() => handleIncrement(item.id)}
                        disabled={item.quantity >= (item.maxQuantity || 10)}
                        aria-label={t("cart.incrementAriaLabel", { name: item.name })}
                        sx={{
                          bgcolor: "action.hover",
                          "&:hover": {
                            bgcolor: "action.selected",
                          },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>

                    <Typography
                      sx={{
                        minWidth: 120,
                        textAlign: "right",
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}
                    >
                      ${sousTotalArticle.toLocaleString()}
                    </Typography>

                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(item)}
                      aria-label={t("cart.deleteAriaLabel", { name: item.name })}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </Paper>
              );
            })}
          </Box>

          <Box sx={{ mt: 3, textAlign: "right" }}>
            <Button
              color="inherit"
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
              href="/products"
            >
              ← {t("cart.continueShopping")}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              position: "sticky",
              top: 100,
              alignSelf: "flex-start",
            }}
          >
            <Paper
              sx={{
                p: 4,
                borderRadius: 5,
                bgcolor: "background.paper",
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 10px 30px rgba(0,0,0,0.6)"
                    : "0 15px 40px rgba(0,0,0,0.06)",
                maxHeight: "calc(100vh - 120px)",
                overflowY: "auto",
              }}
            >
              <Typography variant="h5" fontWeight={900} mb={3} sx={{ marginBottom: "15px" }}>
                {t("cart.summary")}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography color="text.secondary">
                  {t("cart.subtotal", { count: totalArticles })}
                </Typography>
                <Typography fontWeight={600}>
                  ${sousTotal.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography color="text.secondary">{t("cart.shipping")}</Typography>
                <Typography color="success.main" fontWeight={600}>
                  {t("cart.free")}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography color="text.secondary">{t("cart.tax")}</Typography>
                <Typography fontWeight={600}>
                  ${taxe.toFixed(2)}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                  {t("cart.total")}
                </Typography>
                <Typography variant="h5" fontWeight={800}>
                  ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                onClick={handleCheckout}
                disabled={isLoading}
                sx={{
                  py: 2,
                  borderRadius: "16px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  background:
                    theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #6EA8FE, #3D7EFF)"
                      : "linear-gradient(135deg, #4A90E2, #357ABD)",
                  "&:hover": {
                    background:
                      theme.palette.mode === "dark"
                        ? "linear-gradient(135deg, #8EBFFF, #5E9FFF)"
                        : "linear-gradient(135deg, #5BA0F2, #468ACD)",
                  },
                  "&:disabled": {
                    background: "grey.400",
                  },
                }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={24} sx={{ mr: 1, color: "white" }} />
                    {t("cart.processing")}
                  </>
                ) : (
                  t("cart.checkout")
                )}
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: "block",
                  textAlign: "center",
                  mt: 2,
                }}
              >
                {t("cart.securePayment")}
              </Typography>
            </Paper>
          </Box>
        </Grid>
      </Grid>

      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {t("cart.deleteTitle")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            {t("cart.deleteMessage", { name: itemToDelete?.name })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="inherit">
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            {t("common.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ShoppingCart;