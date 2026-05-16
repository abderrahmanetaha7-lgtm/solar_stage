import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import { addOrder } from "../features/orders/orderSlice";

import useCart from "./useCart";
import { clearCart } from "../features/cart/cartSlice";

export default function useCheckout() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { cartItems } = useCart();

  const [activeStep, setActiveStep] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const [errors, setErrors] = useState({});

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const finalTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const steps = [
    t("checkout.steps.cart"),
    t("checkout.steps.customerInfo"),
    t("checkout.steps.confirmation"),
  ];

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateCustomerInfo = () => {
    const newErrors = {};

    if (!customerInfo.firstName) {
      newErrors.firstName = t("checkout.errors.firstNameRequired");
    }

    if (!customerInfo.lastName) {
      newErrors.lastName = t("checkout.errors.lastNameRequired");
    }

    if (!customerInfo.email.includes("@")) {
      newErrors.email = t("checkout.errors.emailInvalid");
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const showError = (message) => {
    setSnackbar({
      open: true,
      message,
      severity: "error",
    });
  };

  const closeSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleSubmitOrder = async () => { 
    if (activeStep === 0) {
      if (!cartItems.length) {
        showError(t("checkout.errors.emptyCart"));

        return;
      }

      setActiveStep(1);

      return;
    }

    if (!validateCustomerInfo()) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        first_name: customerInfo.firstName,

        last_name: customerInfo.lastName,

        email: customerInfo.email,

        phone: customerInfo.phone,

        address: customerInfo.address,

        city: customerInfo.city,

        postal_code: customerInfo.postalCode,

        country: customerInfo.country,

        items: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
      };

      const response = await dispatch(addOrder(orderData)).unwrap();
 
      navigate("/order-confirmation", {
        state: {
          order: response.order,
        },
      });
      dispatch(clearCart());
    } catch (error) {
      showError(error?.message || "Failed to create order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}
