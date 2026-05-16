import React, { useEffect } from "react";

import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { useTranslation } from "react-i18next";

export default function OrderConfirmation() {
  const { t } = useTranslation();

  const location = useLocation();

  const navigate = useNavigate();

  const order = location.state?.order;

  useEffect(() => {
    if (!order) {
      navigate("/products");
    }
  }, [order, navigate]);

  if (!order) return null;

  // ================= FORMAT DATE =================

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // ================= FORMAT TIME =================

  const formatTime = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        py: {
          xs: 3,
          md: 6,
        },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: "28px",

          border: "1px solid",

          borderColor: "divider",

          overflow: "hidden",

          bgcolor: "background.paper",
        }}
      >
        {/* ================= HEADER ================= */}

        <Box
          sx={{
            px: {
              xs: 2.5,
              sm: 4,
            },

            pt: {
              xs: 4,
              sm: 5,
            },

            pb: 4,

            textAlign: "center",
          }}
        >
          <Box
            sx={{
              width: 74,
              height: 74,

              borderRadius: "50%",

              bgcolor: "success.main",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              mx: "auto",

              mb: 2.5,

              boxShadow: "0 10px 30px rgba(34,197,94,0.25)",
            }}
          >
            <CheckCircleRoundedIcon
              sx={{
                fontSize: 42,
                color: "#fff",
              }}
            />
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,

              mb: 1,

              fontSize: {
                xs: "1.7rem",
                sm: "2rem",
              },
            }}
          >
            {t("orderConfirmation.title")}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              maxWidth: 420,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            {t("orderConfirmation.message")}
          </Typography>
        </Box>

        {/* ================= ORDER CARD ================= */}

        <Box
          sx={{
            px: {
              xs: 2,
              sm: 4,
            },

            pb: {
              xs: 3,
              sm: 4,
            },
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 2.5,
                sm: 3,
              },

              borderRadius: "24px",

              border: "1px solid",

              borderColor: "divider",

              bgcolor: "background.default",
            }}
          >
            {/* ORDER ID */}
            <Box textAlign="center">
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 1,
                }}
              >
                {t("orderConfirmation.orderNumber", {
                  id: order.id,
                })}
              </Typography>

              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: "0.95rem",
                }}
              >
                {formatDate(order.created_at)} •{" "}
                {formatTime(order.created_at)}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* PRODUCTS */}
            <Stack spacing={2}>
              {order.items?.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        wordBreak: "break-word",
                        width:{sx:"280px",sm:"390px",md:"460px"},
                        mb:1
                      }}
                    >
                      {item.product_name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {t("orderDetails.quantity")}: {item.quantity}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {(item.price * item.quantity).toFixed(2)}{" "}
                    {t("currency")}
                  </Typography>
                </Box>
              ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* TOTAL */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                }}
              >
                {t("orderConfirmation.total")}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,

                  color: "primary.main",
                }}
              >
                {Number(order.total).toFixed(2)}{" "}
                {t("currency")}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* SHIPPING INFO */}
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6 }}> 
                <Typography
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    
                  }}
                >• {t("orderDetails.fullName")} : {""}
                  {order.first_name} {order.last_name}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.8,
                  }}
                >• {t("orderDetails.address")} : {""}
                  {order.address}
                  <br />
                  • {t("checkout.fields.city")} : {""}
                  {order.city}
                  {order.postal_code
                    ? `, ${order.postal_code}`
                    : ""}
                  <br /> 
                  {order.country}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography
                  color="text.secondary"
                  sx={{
                    lineHeight: 2,
                    wordBreak: "break-word",
                  }}
                >
                  • {t("orderDetails.email")} : {""}
                  {order.email}
                  <br />
                  • {t("orderDetails.phone")} : {""}
                  {order.phone} 
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* ================= ACTIONS ================= */}

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
            sx={{
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={() => navigate("/products")}
              sx={{
                py: 1.5,

                borderRadius: "16px",

                fontWeight: 700,

                textTransform: "none",

                boxShadow: "none",
              }}
            >
              {t("orderConfirmation.continueShopping")}
            </Button>

            <Button
              variant="outlined"
              fullWidth
              size="large"
              onClick={() => window.print()}
              sx={{
                py: 1.5,

                borderRadius: "16px",

                fontWeight: 700,

                textTransform: "none",
              }}
            >
              {t("orderConfirmation.printReceipt")}
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}