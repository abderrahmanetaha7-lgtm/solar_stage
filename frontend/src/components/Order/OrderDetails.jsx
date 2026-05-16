import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Button,
  Stack,
  Paper,
  IconButton,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";

import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";

import { useParams, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { useMemo } from "react";

import { useOrders } from "../../hooks/useOrders";

export default function OrderDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { orders = [], loading } = useOrders();

  /* ================= FIND ORDER ================= */

  const order = useMemo(() => {
    return orders.find((o) => String(o.id) === String(id));
  }, [orders, id]);

  /* ================= STATUS ================= */

  const statusConfig = {
    Pending: {
      label: "status.pending",
      color: "warning",
    },

    Confirmed: {
      label: "status.confirmed",
      color: "info",
    },

    Delivered: {
      label: "status.delivered",
      color: "success",
    },
  };

  /* ================= NOT FOUND ================= */

  if (!loading && !order) {
    return (
      <Box
        sx={{
          p: 4,
          textAlign: "center",
          mt: 10,
          height:"100ch",
        }}
      >
        <Alert
          severity="error"
          sx={{
            maxWidth: 500,
            mx: "auto",
            mb: 3,
          }}
        >
          {t("orderDetails.notFound")}
        </Alert>

        <Button variant="contained" onClick={() => navigate("/orders")}>
          {t("orderDetails.back")}
        </Button>
      </Box>
    );
  }

  const status = statusConfig[order.status] || statusConfig.Pending;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: {
          xs: 4,
          md: 10,
        },
      }}
    >
      <Box
        sx={{
          width: {
            xs: "95%",
            lg: "80%",
          },
          mx: "auto",
        }}
      >
        {/* HEADER */}

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <IconButton
            onClick={() => navigate("/orders")}
            sx={{
              transform:
                i18n.language === "ar" ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Typography
            variant={isMobile ? "h5" : "h4"}
            sx={{
              fontWeight: 800,
              textAlign: "center",
              flex: 1,
            }}
          >
            {t("orderDetails.title")}
          </Typography>

          <Box sx={{ width: 40 }} />
        </Box>

        {/* ORDER HEADER */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              md: 3,
            },

            borderRadius: 4,

            mb: 3,

            border: "1px solid",

            borderColor: "divider",
          }}
        >
          <Box
            sx={{
              display: "flex",

              flexDirection: {
                xs: "column",
                md: "row",
              },

              justifyContent: "space-between",

              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" fontWeight={700}>
                #{order.id}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {new Date(order.created_at).toLocaleDateString()}
              </Typography>
            </Box>

            <Box>
              <Chip
                label={t(status.label)}
                color={status.color}
                sx={{
                  fontWeight: 700,
                }}
              />
            </Box>
          </Box>
        </Paper>

        {/* CONTENT */}

        <Grid container spacing={3}>
          {/* PRODUCTS */}

          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <Card
              sx={{
                borderRadius: 4,
              }}
            >
              <CardContent
                sx={{
                  p: {
                    xs: 2,
                    md: 3,
                  },
                }}
              >
                <Typography variant="h6" fontWeight={700} mb={3}>
                  {t("orderDetails.orderItems")}
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>{t("orderDetails.product")}</TableCell>

                        <TableCell align="center">
                          {t("orderDetails.quantity")}
                        </TableCell>

                        <TableCell align="right">
                          {t("orderDetails.price")}
                        </TableCell>

                        <TableCell align="right">
                          {t("orderDetails.total")}
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {order.items?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Box>
                              <Typography fontWeight={600}>
                                {item.product_name}
                              </Typography>

                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                REF: {item.product_id}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell align="center">{item.quantity}</TableCell>

                          <TableCell align="right">
                            {Number(item.product_price).toLocaleString()}{" "}
                            {t("currency")}
                          </TableCell>

                          <TableCell align="right">
                            <Typography fontWeight={700}>
                              {Number(item.total).toLocaleString()}{" "}
                              {t("currency")}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* RIGHT */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <Grid container spacing={3}>
              {/* SUMMARY */}

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={3}>
                      {t("orderDetails.orderSummary")}
                    </Typography>

                    <Stack spacing={2}> 

                      <Box
                        sx={{
                          display: "flex",

                          justifyContent: "space-between",
                        }}
                      >
                        <Typography color="text.secondary">
                          {t("orderDetails.shipping")}
                        </Typography>

                        <Typography fontWeight={600}>
                          {t("orderDetails.Gratuite")} 
                        </Typography>
                      </Box> 

                      <Divider />

                      <Box
                        sx={{
                          display: "flex",

                          justifyContent: "space-between",
                        }}
                      >
                        <Typography fontWeight={700}>
                          {t("orderDetails.total")}
                        </Typography>

                        <Typography fontWeight={800} color="primary.main">
                          {Number(order.total).toLocaleString()} {t("currency")}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* CUSTOMER */}

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Card
                  sx={{
                    borderRadius: 4,
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={3}>
                      {t("orderDetails.customerInfo")}
                    </Typography>

                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {t("orderDetails.fullName")}
                        </Typography>

                        <Typography fontWeight={600}>
                          {order.first_name} {order.last_name}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {t("orderDetails.email")}
                        </Typography>

                        <Typography fontWeight={600}>{order.email}</Typography>
                      </Box>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {t("orderDetails.phone")}
                        </Typography>

                        <Typography fontWeight={600}>{order.phone}</Typography>
                      </Box>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {t("orderDetails.address")}
                        </Typography>

                        <Typography fontWeight={600}>
                          {order.address}, {order.city}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {t("orderDetails.country")}
                        </Typography>

                        <Typography fontWeight={600}>
                          {order.country}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
