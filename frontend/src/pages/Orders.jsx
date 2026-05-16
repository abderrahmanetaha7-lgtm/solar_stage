import { useMemo } from "react";

import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Grid,
  CircularProgress,
  Chip,
  Skeleton,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
 
import { cancelUserOrder } from "../features/orders/orderSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import EmptyOrders from "../components/Order/EmptyOrders";

import { useOrders } from "../hooks/useOrders";

export default function Orders() {
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const { t } = useTranslation();

  const navigate = useNavigate();

  const { orders = [], loading } = useOrders();

  /* ================= USER ORDERS ================= */

  const userOrders = useMemo(() => {
    return orders.map((order) => ({
      id: order.id,

      status: order.status || "Pending",

      total: Number(order.total || 0),

      created_at: order.created_at,

      itemsCount: Array.isArray(order.items)
        ? order.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
        : 0,
    }));
  }, [orders]);

  /* ================= STATUS CONFIG ================= */

  const statusConfig = {
    Pending: {
      label: t("status.pending"),
      color: "warning",
    },

    Confirmed: {
      label: t("status.confirmed"),
      color: "primary",
    },

    Delivered: {
      label: t("status.delivered"),
      color: "success",
    },
    Cancelled: {
      label: t("status.cancelled"),
      color: "error",
    },
  };

  const dispatch = useDispatch();

  return (
    <>
      <Box
        sx={{
          p: 3,
          minHeight: "100vh",
          width: {
            xs: "95%",
            md: "80%",
          },
          mx: "auto",
          mt: 8,
        }}
      >
        {/* TITLE */}

        {!loading ? (
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              mb: 3,
            }}
          >
            {t("orders.title")}
          </Typography>
        ) : (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              mb: 4,
              width: "30%",
              height: 45,
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",

              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255,255,255,0.06)"
                  : "rgba(0,0,0,0.06)",
            }}
          />
        )}

        {/* EMPTY */}

        {!loading && userOrders.length === 0 && <EmptyOrders />}

        {/* ORDERS */}

        <Grid container spacing={3}>
          {loading
            ? [1, 2, 3, 4, 5, 6].map((_, index) => (
                <Grid
                  key={index}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 5,
                      overflow: "hidden",
                      bgcolor: "background.paper",

                      boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                          ? "0 8px 30px rgba(0,0,0,0.35)"
                          : "0 8px 30px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{
                        width: "100%",
                        height: 300,

                        bgcolor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.06)",
                      }}
                    />
                  </Box>
                </Grid>
              ))
            : userOrders.map((order) => {
                const status =
                  statusConfig[order.status] || statusConfig.Pending;

                return (
                  <Grid
                    key={order.id}
                    size={{
                      xs: 12,
                      sm: 6,
                      md: 4,
                    }}
                  >
                    <Card
                      sx={{
                        mt: 2,
                        borderRadius: 4,

                        height: "100%",

                        transition: "0.2s",

                        border: "1px solid",

                        borderColor: "divider",

                        "&:hover": {
                          transform: "translateY(-4px)",
                        },
                      }}
                    >
                      <CardContent>
                        {/* HEADER */}

                        <Box
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" fontWeight={700}>
                            #{order.id}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {new Date(order.created_at).toLocaleDateString()}
                          </Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        {/* CONTENT */}

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography color="text.secondary">
                              {t("orders.items")}
                            </Typography>

                            <Typography fontWeight={600}>
                              {order.itemsCount}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography color="text.secondary">
                              {t("orders.total")}
                            </Typography>

                            <Typography fontWeight={700}>
                              {order.total.toLocaleString()} {t("currency")}
                            </Typography>
                          </Box>

                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",

                              alignItems: "center",
                            }}
                          >
                            <Typography color="text.secondary">
                              {t("orders.status")}
                            </Typography>

                            <Chip
                              label={status.label}
                              color={status.color}
                              size="small"
                            />
                          </Box>
                        </Box>

                        {/* ACTION */}

                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mt: 3,
                          }}
                        >
                          <Button
                            fullWidth
                            variant="contained"
                            sx={{
                              borderRadius: 3,
                              py: 1.2,
                            }}
                            onClick={() =>
                              navigate(`/orders-detail/${order.id}`)
                            }
                          >
                            {t("orders.seeDetails")}
                          </Button>

                          {order.status !== "Delivered" &&
                            order.status !== "Cancelled" && (
                              <Button
                                variant="outlined"
                                color="error"
                                sx={{
                                  minWidth: 50,
                                  borderRadius: 3,
                                  px: 1,
                                }}
                                onClick={() => {
                                  setSelectedOrder(order.id);
                                  setOpenDelete(true);
                                }}
                              >
                                <CancelIcon />
                              </Button>
                            )}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      </Box>
      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        PaperProps={{
          sx: {
            borderRadius: 4,
            p: 1,
          },
        }}
      >
        <DialogTitle fontWeight={700}>{t("orderCancelDialog.title")}</DialogTitle>

        <DialogContent>
          <DialogContentText>
            {t("orderCancelDialog.message")}
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => setOpenDelete(false)}>
             
            {t("orderCancelDialog.closeButton")}
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={() => {
              dispatch(cancelUserOrder(selectedOrder));
              
              setOpenDelete(false);
            }}
            > 
            {t("orderCancelDialog.confirmButton")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
