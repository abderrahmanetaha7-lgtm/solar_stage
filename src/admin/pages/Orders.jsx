import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
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
import { useAdmin } from "../hooks/useAdmin";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrdersPage() {
  const { orders = [] } = useAdmin();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  /* ================= NORMALIZE DATA ================= */
  const normalizedOrders = useMemo(() => {
    return orders.map((o) => {
      const total = Number(o.total) || 0;

      const itemsCount = Array.isArray(o.items)
        ? o.items.reduce(
            (sum, item) => sum + Number(item.quantity || 0),
            0
          )
        : Number(o.items || 0);

      return {
        id: o.id,
        customerName: o.user?.name || o.customer || "Unknown",
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
        title="Orders"
        description="Track and manage customer orders"
        actions={
          <Button variant="outlined" startIcon={<DownloadIcon />}>
            Export
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
            placeholder="Search by order ID or customer..."
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
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Items</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
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
                      onClick={() =>
                        navigate(`/orders-detail/${o.id}`)
                      }
                    >
                      {/* ID */}
                      <TableCell fontWeight={600}>
                        #{o.id}
                      </TableCell>

                      {/* CUSTOMER */}
                      <TableCell>
                        <Typography variant="body2">
                          {o.customerName}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {o.customerEmail}
                        </Typography>
                      </TableCell>

                      {/* ITEMS */}
                      <TableCell>
                        {o.itemsCount}
                      </TableCell>

                      {/* DATE */}
                      <TableCell sx={{ color: "text.secondary" }}>
                        {o.date
                          ? new Date(o.date).toLocaleDateString()
                          : "-"}
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                            borderRadius: "999px",
                            border: "1px solid",
                            px: 1,
                            py: 0.2,
                            bgcolor: style.bg,
                            borderColor: style.border,
                          }}
                        >
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: style.dot,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: 12,
                              fontWeight: 500,
                              color: style.color,
                              textTransform: "capitalize",
                            }}
                          >
                            {o.status}
                          </Typography>
                        </Box>
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
                    No orders found
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