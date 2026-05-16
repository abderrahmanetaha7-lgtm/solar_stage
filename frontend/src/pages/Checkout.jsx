// Checkout.jsx

import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import EmptyCart from "../components/cart/EmptyCart";
import { useTranslation } from "react-i18next";

import CheckoutStepper from "../components/Checkout/CheckoutStepper";
import CartStep from "../components/Checkout/CartStep";
import CustomerStep from "../components/Checkout/CustomerStep";
import OrderSummary from "../components/Checkout/OrderSummary";

import useCheckout from "../hooks/useCheckout";

export default function Checkout() {
  const { t } = useTranslation();

  const {
    activeStep,
    setActiveStep,
    steps,

    cartItems,

    customerInfo,
    errors,

    isSubmitting,

    finalTotal,

    snackbar,

    handleCustomerChange,
    handleSubmitOrder,
    closeSnackbar,
  } = useCheckout();

  if (!cartItems.length) {
    return <EmptyCart />;
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: {
          xs: 4,
          md: 6,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2,
            md: 4,
          },
          borderRadius: "30px",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* HEADER */}
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 800,
            mb: 1,
            fontSize: {
              xs: "2rem",
              md: "2.5rem",
            },
          }}
        >
          {t("checkout.title")}
        </Typography>
 

        {/* STEPPER */}
        <CheckoutStepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />

        {/* CONTENT */}
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            {activeStep === 0 && <CartStep />}

            {activeStep === 1 && (
              <CustomerStep
                customerInfo={customerInfo}
                errors={errors}
                handleCustomerChange={handleCustomerChange}
                t={t}
              />
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <OrderSummary
              total={finalTotal}
              cartItems={cartItems}
              t={t}
              buttonText={
                activeStep === 1
                  ? t("checkout.placeOrder")
                  : t("checkout.continue")
              }
              onButtonClick={handleSubmitOrder}
              isLoading={isSubmitting}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={closeSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Alert
          severity={snackbar.severity}
          variant="filled"
          onClose={closeSnackbar}
          sx={{
            borderRadius: "14px",
            width: "100%",
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
