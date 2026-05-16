import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import ArchiveIcon from "@mui/icons-material/Archive";
import DownloadIcon from "@mui/icons-material/Download";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";

import {
  archiveOrder,
  changeOrderStatus,
} from "../../features/orders/orderSlice";

import { useOrders } from "../../hooks/useOrders";

import Menu from "@mui/material/Menu";

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { orders = [], loading } = useOrders();

  const [search, setSearch] = useState("");

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const openExportMenu = Boolean(anchorEl);

  /* ================= NORMALIZE ================= */

  const normalizedOrders = useMemo(() => {
    return orders.map((o) => {
      const total = Number(o.total) || 0;

      const itemsCount = Array.isArray(o.items)
        ? o.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
        : 0;

      return {
        id: o.id,

        customerName:
          `${o.first_name || ""} ${o.last_name || ""}`.trim() ||
          "Client inconnu",

        customerEmail: o.email || "-",

        date: o.created_at,

        total,

        itemsCount,

        status: o.status || "Pending",
      };
    });
  }, [orders]);

  /* ================= SEARCH ================= */

  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase();

    return normalizedOrders.filter((o) => {
      if (o.status === "Archived") return false;

      const matchesSearch =
        o.id?.toString().includes(keyword) ||
        o.customerName?.toLowerCase().includes(keyword);

      const matchesStatus = statusFilter === "" || o.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [normalizedOrders, search, statusFilter]);

  const getAllowedStatuses = (status) => {
    switch (status) {
      case "Pending":
        return [
          { value: "Pending", label: "En attente" },
          { value: "Confirmed", label: "Confirmée" },
          { value: "Cancelled", label: "Annulée" },
        ];

      case "Confirmed":
        return [
          { value: "Confirmed", label: "Confirmée" },
          { value: "Delivered", label: "Livrée" },
          { value: "Cancelled", label: "Annulée" },
        ];

      case "Delivered":
        return [
          { value: "Delivered", label: "Livrée" },
          { value: "Returned", label: "Retournée" },
        ];

      case "Returned":
        return [{ value: "Returned", label: "Retournée" }];

      case "Cancelled":
        return [{ value: "Cancelled", label: "Annulée" }];

      default:
        return [];
    }
  }; 

  const exportToExcel = () => {
    const data = filteredOrders.map((o) => ({
      ID: o.id,

      Client: o.customerName,

      Email: o.customerEmail,

      Articles: o.itemsCount,

      Date: o.date ? new Date(o.date).toLocaleDateString() : "-",

      Statut: getStatusLabel(o.status),

      Total: `${o.total} MAD`,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Liste des commandes", 14, 20);

    const tableData = filteredOrders.map((o) => [
      `#${o.id}`,

      o.customerName,

      o.itemsCount,

      o.date ? new Date(o.date).toLocaleDateString() : "-",

      getStatusLabel(o.status),

      `${o.total.toLocaleString()} MAD`,
    ]);

    autoTable(doc, {
      startY: 30,

      head: [["ID", "Client", "Articles", "Date", "Statut", "Total"]],

      body: tableData,

      styles: {
        fontSize: 10,
      },

      headStyles: {
        fillColor: [25, 118, 210],
      },
    });

    doc.save("orders.pdf");
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "Pending":
        return "En attente";

      case "Confirmed":
        return "Confirmée";

      case "Delivered":
        return "Livrée";

      case "Cancelled":
        return "Annulée";

      case "Returned":
        return "Retournée";

      default:
        return status;
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* HEADER */}

      <PageHeader
        title="Commandes"
        description="Gérez les commandes des clients"
        actions={
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            Exporter
          </Button>
        }
      />

      {/* CARD */}

      <Card
        sx={{
          p: 3,
          borderRadius: 4,
          boxShadow: "var(--shadow-soft)",
        }}
      >
        {/* SEARCH */}

        <Box
          sx={{
            mb: 3,
            display: "flex",
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {/* SEARCH */}

          <TextField
            sx={{ flex: 1, minWidth: 250 }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher par ID ou client..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* FILTER STATUS */}

          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
            sx={{ minWidth: 220 }}
          >
            <MenuItem value="">Tous les statuts</MenuItem>

            <MenuItem value="Pending">En attente</MenuItem>

            <MenuItem value="Confirmed">Confirmée</MenuItem>

            <MenuItem value="Delivered">Livrée</MenuItem>

            <MenuItem value="Cancelled">Annulée</MenuItem>

            <MenuItem value="Returned">Retournée</MenuItem>
          </Select>
        </Box>

        {/* TABLE */}

        <TableContainer>
          <Table>
            {/* HEAD */}

            <TableHead>
              <TableRow>
                <TableCell>ID Commande</TableCell>

                <TableCell>Client</TableCell>

                <TableCell>Articles</TableCell>

                <TableCell>Date</TableCell>

                <TableCell>Statut</TableCell>

                <TableCell>Total</TableCell>

                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* BODY */}

            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((o) => {
                  return (
                    <TableRow key={o.id} hover>
                      {/* ORDER ID */}

                      <TableCell sx={{ fontWeight: 700 }}>#{o.id}</TableCell>

                      {/* CLIENT */}

                      <TableCell>
                        <Typography variant="body2">
                          {o.customerName}
                        </Typography>

                        <Typography variant="caption" color="text.secondary">
                          {o.customerEmail}
                        </Typography>
                      </TableCell>

                      {/* ARTICLES */}

                      <TableCell>
                        {o.itemsCount} article
                        {o.itemsCount > 1 ? "s" : ""}
                      </TableCell>

                      {/* DATE */}

                      <TableCell>
                        {o.date ? new Date(o.date).toLocaleDateString() : "-"}
                      </TableCell>

                      {/* STATUS */}

                      <TableCell>
                        <Select
                          value={o.status}
                          onChange={(e) => {
                            dispatch(
                              changeOrderStatus({
                                id: o.id,
                                status: e.target.value,
                              }),
                            );
                          }}
                        >
                          {getAllowedStatuses(o.status).map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                              {status.label}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>

                      {/* TOTAL */}

                      <TableCell sx={{ fontWeight: 700 }}>
                        {o.total.toLocaleString()} MAD
                      </TableCell>

                      {/* ACTIONS */}

                      <TableCell align="right">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                          }}
                        >
                          {/* VIEW */}

                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigate(`/admin/orders-detail/${o.id}`)
                            }
                          >
                            <VisibilityIcon />
                          </IconButton>

                          {/* DELETE */}

                          <IconButton
                            color="error"
                            onClick={() => {
                              setSelectedOrder(o);

                              setOpenDelete(true);
                            }}
                          >
                            <ArchiveIcon />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Aucune commande trouvée
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* DELETE DIALOG */}

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle fontWeight={700}>Archiver la commande</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Cette commande sera déplacée vers les archives.
          </DialogContentText>

          {selectedOrder && (
            <DialogContentText sx={{ mt: 2 }}>
              Commande :<strong> #{selectedOrder.id}</strong>
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => setOpenDelete(false)}>
            Annuler
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={async () => {
              await dispatch(archiveOrder(selectedOrder.id));

              setOpenDelete(false);

              setSelectedOrder(null);
            }}
          >
            Archiver
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={anchorEl}
        open={openExportMenu}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            exportToExcel();

            setAnchorEl(null);
          }}
        >
          Excel
        </MenuItem>

        <MenuItem
          onClick={() => {
            exportToPDF();

            setAnchorEl(null);
          }}
        >
          PDF
        </MenuItem>
      </Menu>
    </>
  );
}
