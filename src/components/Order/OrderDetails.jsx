import { useEffect, useState } from "react";
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
  Avatar,
  Paper,
  IconButton,
  Breadcrumbs,
  Link,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Home as HomeIcon,
  Receipt as ReceiptIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";

const statusConfig = {
  pending: {
    label: "قيد الانتظار",
    color: "warning",
  },
  confirmed: {
    label: "تم التأكيد",
    color: "info",
  },
  delivered: {
    label: "تم التسليم",
    color: "success",
  },
};

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("orders");
    const orders = saved ? JSON.parse(saved) : [];
    const found = orders.find((o) => o.id === id);
    setOrder(found || null);
  }, [id]);

  if (!order) {
    return (
      <Box sx={{ p: 4, textAlign: "center", mt: 10 }}>
        <Alert severity="error" sx={{ maxWidth: 500, mx: "auto", mb: 3 }}>
          Order not found
        </Alert>
        <Button variant="contained" onClick={() => navigate("/orders")}>
          Back to Orders
        </Button>
      </Box>
    );
  }

  const status = statusConfig[order.status] || statusConfig.pending;

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 4, md: 10 } }}>
      <Box sx={{ width: { xs: "95%", lg: "80%" }, mx: "auto" }}>
        <Box
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    mb: 2,
  }}
>
  {/* BACK BUTTON */}
  <IconButton
    onClick={() => navigate("/orders")}
    sx={{
      border: "1px solid #e0e0e0",
      borderRadius: 2,
    }}
  >
    <ArrowBackIcon />
  </IconButton>

  {/* TITLE (centered visually) */}
  <Typography
    variant={isMobile ? "h5" : "h4"}
    sx={{
      fontWeight: 800,
      fontSize: isMobile ? "22px" : "30px",
      textAlign: "center",
      flex: 1,
    }}
  >
    Order Details
  </Typography>

  {/* empty space for symmetry */}
  <Box sx={{ width: 40 }} />
</Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 3,
            mb: 3,
            mt: 2,
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            spacing={2}
            mt={2}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                width: "100%",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="h6">Order #{order.id}</Typography>

                <Typography variant="body2" sx={{ mt: 1 }}>
                  Placed on {new Date(order.orderDate).toLocaleDateString()}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography>Status:</Typography>
                <Chip
                  label={status.label}
                  color={status.color}
                  sx={{ fontWeight: 600 }}
                />
              </Box>
            </Box>
          </Stack>
        </Paper>

        <Grid container spacing={3} sx={{ width: "100%" }}>
          {/* LEFT / TABLE */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
              <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" fontWeight={700} mb={3}>
                  Order Items
                </Typography>

                <TableContainer sx={{ overflowX: "auto" }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ bgcolor: "#fafafa" }}>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Total</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <Avatar
                                src={item.image}
                                variant="rounded"
                                sx={{ width: 50, height: 50 }}
                              >
                                {!item.image && <ReceiptIcon />}
                              </Avatar>

                              <Box>
                                <Typography fontWeight={600}>
                                  {item.name}
                                </Typography>
                                <Typography variant="caption">
                                  Quantity: {item.quantity}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>

                          <TableCell align="right">${item.price}</TableCell>

                          <TableCell align="right">
                            <Typography fontWeight={700}>
                              ${item.price * item.quantity}
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

          {/* RIGHT SECTION (responsive group) */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Grid container spacing={3}>
              {/* SUMMARY */}
              <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={2}>
                      Order Summary
                    </Typography>

                    <Stack spacing={2}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Subtotal</Typography>
                        <Typography>${order.subtotal}</Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Shipping</Typography>
                        <Typography>${order.shipping}</Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography>Tax</Typography>
                        <Typography>${order.tax}</Typography>
                      </Box>

                      <Divider />

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography fontWeight={700}>Total</Typography>
                        <Typography fontWeight={800}>${order.total}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>

              {/* CUSTOMER */}
              <Grid size={{ xs: 12, sm: 6, md: 12 }}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700} mb={2}>
                      Customer Information
                    </Typography>

                    <Stack spacing={2}>
                      <Box>
                        <Typography variant="caption">Full Name</Typography>
                        <Typography>
                          {order.customer.firstName} {order.customer.lastName}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="caption">Email</Typography>
                        <Typography>{order.customer.email}</Typography>
                      </Box>

                      <Box>
                        <Typography variant="caption">Phone</Typography>
                        <Typography>{order.customer.phone}</Typography>
                      </Box>

                      <Box>
                        <Typography variant="caption">Address</Typography>
                        <Typography>
                          {order.customer.address}, {order.customer.city}
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
