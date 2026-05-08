import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import { MenuItem, Select } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import {
  Box,
  Button,
  Card,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import PageHeader from "../components/PageHeader";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { editOrder } from "../../features/orders/orderSlice";
import { useOrders } from "../../hooks/useOrders";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders = [], loading } = useOrders();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Chargement...</Typography>
      </Box>
    );
  }

  /* ================= NORMALIZE DATA ================= */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const normalizedOrders = useMemo(() => {
    return orders.map((o) => {
      const total = Number(o.total) || 0;

      const itemsCount = Array.isArray(o.items)
        ? o.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
        : Number(o.items || 0);

      return {
        id: o.id,
        customerName: o.user?.name || o.customer || "Inconnu",
        customerEmail: o.user?.email || o.email || "-",
        date: o.created_at || o.date || null,
        total,
        itemsCount,
        status: (o.status || "pending").toLowerCase(),
      };
    });
  }, [orders]);

  /* ================= SEARCH ================= */
  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase();

    return normalizedOrders.filter((o) => {
      return (
        o.id?.toString().includes(keyword) ||
        o.customerName?.toLowerCase().includes(keyword)
      );
    });
  }, [normalizedOrders, search]);

  /* ================= STATUS STYLE ================= */
  const getStatusStyle = (status) => {
    const map = {
      delivered: {
        bg: "rgba(76,175,80,0.1)",
        border: "rgba(76,175,80,0.2)",
        color: "#2e7d32",
        dot: "#4caf50",
      },
      shipped: {
        bg: "rgba(2,136,209,0.1)",
        border: "rgba(2,136,209,0.2)",
        color: "#0288d1",
        dot: "#0288d1",
      },
      confirmed: {
        bg: "rgba(63,81,181,0.1)",
        border: "rgba(63,81,181,0.2)",
        color: "#3f51b5",
        dot: "#3f51b5",
      },
      pending: {
        bg: "rgba(255,152,0,0.15)",
        border: "rgba(255,152,0,0.3)",
        color: "#ed6c02",
        dot: "#ff9800",
      },
    };

    return map[status] || map.pending;
  };

  return (
    <>
      {/* HEADER */}
      <PageHeader
        title="Commandes"
        description="Suivre et gérer les commandes clients"
        actions={
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Exporter
          </Button>
        }
      />

      {/* CARD */}
      <Card sx={{ p: 2, boxShadow: "var(--shadow-soft)" }}>
        {/* SEARCH */}
        <Box sx={{ mb: 2, maxWidth: "sm" }}>
          <TextField
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par ID de commande ou client..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* TABLE */}
        <TableContainer>
          <Table>
            {/* HEAD */}
            <TableHead>
              <TableRow>
                <TableCell>ID de commande</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Articles</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>

            {/* BODY */}
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => {
                  const style = getStatusStyle(o.status);

                  return (
                    <TableRow
                      key={o.id}
                      hover
                      sx={{ cursor: "pointer" }}
                      onClick={() => navigate(`/orders-detail/${o.id}`)}
                    >
                      {/* ID */}
                      <TableCell fontWeight={600}>#{o.id}</TableCell>

                      {/* CUSTOMER */}
                      <TableCell>
                        <Typography variant="body2">
                          {o.customerName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {o.customerEmail}
                        </Typography>
                      </TableCell>

                      {/* ITEMS */}
                      <TableCell>{o.itemsCount}</TableCell>

                      {/* DATE */}
                      <TableCell sx={{ color: "text.secondary" }}>
                        {o.date ? new Date(o.date).toLocaleDateString() : "-"}
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        <Select
                          size="small"
                          value={o.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => {
                            dispatch(
                              editOrder({
                                id: o.id,
                                data: {
                                  status: e.target.value,
                                },
                              }),
                            );
                          }}
                          sx={{
                            minWidth: 140,
                            borderRadius: "999px",
                            bgcolor: style.bg,
                            color: style.color,
                            fontWeight: 600,

                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: style.border,
                            },

                            "& .MuiSelect-icon": {
                              color: style.color,
                            },
                          }}
                        >
                          <MenuItem value="pending">Pending</MenuItem>
                          <MenuItem value="confirmed">Confirmed</MenuItem>
                          <MenuItem value="delivered">Delivered</MenuItem>
                        </Select>
                      </TableCell>

                      {/* TOTAL */}
                      <TableCell align="right" fontWeight={700}>
                        {o.total.toLocaleString()} MAD
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Aucune commande trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
