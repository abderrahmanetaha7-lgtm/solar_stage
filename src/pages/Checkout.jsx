import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
  Card,
  IconButton,
  Alert,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useTranslation } from "react-i18next"; // Ajout de l'import

const Checkout = () => {
  const { t } = useTranslation(); // Hook de traduction
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const location = useLocation();
  
  // Récupérer les données du panier depuis props ou localStorage
  const [cartItems, setCartItems] = useState(() => {
    if (location.state?.cartItems) {
      return location.state.cartItems;
    }
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Informations client uniquement (suppression des infos de paiement)
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Maroc",
  });

  // Erreurs de validation
  const [errors, setErrors] = useState({});

  // Calcul du total
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.008;
  const shipping = subtotal > 100 ? 0 : 20;
  const total = subtotal + tax + shipping;

  // Changement des étapes - Suppression de l'étape Paiement
  const steps = [
    t("checkout.steps.cart"),
    t("checkout.steps.customerInfo"),
    t("checkout.steps.confirmation")
  ];

  // Gestion des changements de champs
  const handleCustomerChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  // Validation des informations client
  const validateCustomerInfo = () => {
    const newErrors = {};
    
    if (!customerInfo.firstName.trim()) newErrors.firstName = t("checkout.errors.firstNameRequired");
    if (!customerInfo.lastName.trim()) newErrors.lastName = t("checkout.errors.lastNameRequired");
    if (!customerInfo.email.trim()) {
      newErrors.email = t("checkout.errors.emailRequired");
    } else if (!customerInfo.email.includes("@") || !customerInfo.email.includes(".")) {
      newErrors.email = t("checkout.errors.emailInvalid");
    }
    if (!customerInfo.phone.trim()) newErrors.phone = t("checkout.errors.phoneRequired");
    if (!customerInfo.address.trim()) newErrors.address = t("checkout.errors.addressRequired");
    if (!customerInfo.city.trim()) newErrors.city = t("checkout.errors.cityRequired");
    if (!customerInfo.postalCode.trim()) newErrors.postalCode = t("checkout.errors.postalCodeRequired");
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Gestion des quantités
  const updateQuantity = (itemId, change) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + change;
          if (newQuantity >= 1 && newQuantity <= (item.maxQuantity || 10)) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      })
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Fonction pour générer un numéro de commande unique
  const generateOrderId = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    
    return `CMD-${year}${month}${day}-${hours}${minutes}${seconds}-${milliseconds}`;
  };

  // Gestion de la soumission de commande et redirection vers OrderConfirmation
  const handleSubmitOrder = () => {
    // Étape de révision 0 : Panier
    if (activeStep === 0) {
      if (cartItems.length === 0) {
        setSnackbar({
          open: true,
          message: t("checkout.errors.emptyCart"),
          severity: "error",
        });
        return;
      }
      setActiveStep(1);
      return;
    }

    // Étape 1 : Informations client - validation puis soumission
    if (activeStep === 1) {
      if (validateCustomerInfo()) {
        setIsSubmitting(true);
        
        // Création de l'objet commande
        const orderId = generateOrderId();
        const currentDate = new Date().toISOString();
        
        const orderData = {
          id: orderId,
          orderDate: currentDate,
          customer: customerInfo,
          items: cartItems,
          subtotal: subtotal,
          tax: tax,
          shipping: shipping,
          total: total,
          paymentMethod: t("checkout.cashOnDelivery"),
          status: t("checkout.orderConfirmed")
        };
        
        // Simulation du traitement de la commande
        setTimeout(() => {
          // Sauvegarde de la commande dans localStorage
          const savedOrders = localStorage.getItem("orders");
          const orders = savedOrders ? JSON.parse(savedOrders) : [];
          orders.push(orderData);
          localStorage.setItem("orders", JSON.stringify(orders));
          
          // Vidage du panier
          localStorage.removeItem("cart");
          
          // Redirection vers la page de confirmation avec les données de la commande
          navigate("/order-confirmation", { state: { order: orderData } });
          
          setIsSubmitting(false);
        }, 1500);
      }
      return;
    }
  };

  // Affichage de l'étape du panier avec cartes miniatures
  const renderCartStep = () => (
    <>
      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <ShoppingBagIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            {t("checkout.emptyCart")}
          </Typography>
          <Button variant="contained" onClick={() => navigate("/products")}>
            {t("checkout.continueShopping")}
          </Button>
        </Box>
      ) : (
        cartItems.map((item) => (
          <Card 
            key={item.id} 
            sx={{ 
              mb: 1.5,
              p: 1,
              borderRadius: 2,
              boxShadow: 1,
              '&:hover': {
                boxShadow: 2,
              }
            }}
          >
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={3} sm={2}>
                <Box
                  component="img"
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: 70,
                    borderRadius: 1,
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={9} sm={6}>
                <Typography variant="body1" fontWeight={600}>
                  {item.name}
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  ${item.price.toLocaleString()} {t("checkout.perUnit")}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                    sx={{ p: 0.5 }}
                    aria-label={t("checkout.decrementAriaLabel", { name: item.name })}
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography fontWeight={600} variant="body2">
                    {item.quantity}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={item.quantity >= (item.maxQuantity || 10)}
                    sx={{ p: 0.5 }}
                    aria-label={t("checkout.incrementAriaLabel", { name: item.name })}
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item xs={4} sm={1}>
                <Typography fontWeight={700} variant="body2">
                  ${(item.price * item.quantity).toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={2} sm={1}>
                <IconButton 
                  color="error" 
                  onClick={() => removeItem(item.id)}
                  size="small"
                  sx={{ p: 0.5 }}
                  aria-label={t("checkout.deleteAriaLabel", { name: item.name })}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Card>
        ))
      )}
    </>
  );

  // Affichage de l'étape des informations client
  const renderCustomerStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label={t("checkout.fields.firstName")}
          name="firstName"
          value={customerInfo.firstName}
          onChange={handleCustomerChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label={t("checkout.fields.lastName")}
          name="lastName"
          value={customerInfo.lastName}
          onChange={handleCustomerChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label={t("checkout.fields.email")}
          name="email"
          type="email"
          value={customerInfo.email}
          onChange={handleCustomerChange}
          error={!!errors.email}
          helperText={errors.email}
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label={t("checkout.fields.phone")}
          name="phone"
          value={customerInfo.phone}
          onChange={handleCustomerChange}
          error={!!errors.phone}
          helperText={errors.phone}
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={t("checkout.fields.address")}
          name="address"
          value={customerInfo.address}
          onChange={handleCustomerChange}
          error={!!errors.address}
          helperText={errors.address}
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label={t("checkout.fields.city")}
          name="city"
          value={customerInfo.city}
          onChange={handleCustomerChange}
          error={!!errors.city}
          helperText={errors.city}
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label={t("checkout.fields.postalCode")}
          name="postalCode"
          value={customerInfo.postalCode}
          onChange={handleCustomerChange}
          error={!!errors.postalCode}
          helperText={errors.postalCode}
          required
          size="small"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={t("checkout.fields.country")}
          name="country"
          value={customerInfo.country}
          onChange={handleCustomerChange}
          disabled
          size="small"
        />
      </Grid>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 2 }}>
      <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={800} gutterBottom align="center">
          {t("checkout.title")}
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            {activeStep === 0 && renderCartStep()}
            {activeStep === 1 && renderCustomerStep()}
          </Grid>

          <Grid item xs={12} md={5}>
            {/* Carte récapitulative agrandie */}
            <Paper 
              sx={{ 
                p: 4, 
                position: "sticky", 
                top: 100,
                transform: "scale(1.02)",
                transition: "transform 0.3s ease",
                borderRadius: 4,
                bgcolor: theme.palette.mode === 'dark' ? 'grey.900' : 'background.paper',
                boxShadow: theme.palette.mode === 'dark' 
                  ? '0 8px 32px rgba(0,0,0,0.3)' 
                  : '0 8px 32px rgba(0,0,0,0.1)',
                border: theme.palette.mode === 'dark' 
                  ? '1px solid rgba(255,255,255,0.1)' 
                  : '1px solid rgba(0,0,0,0.1)',
              }}
            >
              <Typography 
                variant="h5" 
                fontWeight={800} 
                gutterBottom
                sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                    : 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: 2
                }}
              >
                {t("checkout.summary")}
              </Typography>
              
              <Box sx={{ my: 3 }}>
                <Typography color="text.secondary" gutterBottom variant="body1">
                  {t("checkout.itemsCount", { count: cartItems.length })}
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                    <Typography variant="body1">{t("checkout.subtotal")}</Typography>
                    <Typography variant="body1" fontWeight={500}>
                      ${subtotal.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                    <Typography variant="body1">{t("checkout.tax")}</Typography>
                    <Typography variant="body1" fontWeight={500}>
                      ${tax.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                    <Typography variant="body1">{t("checkout.shipping")}</Typography>
                    <Typography variant="body1" fontWeight={500} color="success.main">
                      {shipping === 0 ? t("checkout.free") : `$${shipping.toFixed(2)}`}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2.5 }} />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h5" fontWeight={800}>{t("checkout.total")}</Typography>
                    <Typography variant="h4" fontWeight={900} sx={{
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                        : 'linear-gradient(135deg, #FF8C00 0%, #FFD700 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                    }}>
                      ${total.toFixed(2)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              {/* Boutons jaunes adaptés au mode sombre/clair */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleSubmitOrder}
                disabled={isSubmitting || (activeStep === 0 && cartItems.length === 0)}
                sx={{
                  py: 1.8,
                  borderRadius: 3,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  bgcolor: theme.palette.mode === 'dark' ? '#FFD700' : '#FFA500',
                  color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? '#FFC107' : '#FF8C00',
                    transform: 'translateY(-2px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 6px 20px rgba(255, 215, 0, 0.3)'
                      : '0 6px 20px rgba(255, 165, 0, 0.3)',
                  },
                  '&:active': {
                    transform: 'translateY(0px)',
                  },
                  transition: 'all 0.3s ease',
                  textTransform: 'none',
                  letterSpacing: '0.5px',
                }}
              >
                {isSubmitting ? (
                  <CircularProgress size={28} color="inherit" />
                ) : (
                  activeStep === 1 ? t("checkout.placeOrder") : t("checkout.continue")
                )}
              </Button>

              {/* Note subtile */}
              <Typography 
                variant="caption" 
                sx={{ 
                  display: 'block', 
                  textAlign: 'center', 
                  mt: 2,
                  color: 'text.secondary'
                }}
              >
                {t("checkout.cashOnDeliveryOnly")}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Checkout;