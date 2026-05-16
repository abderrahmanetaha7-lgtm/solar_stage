import React, { useEffect } from "react";

import {
  Box,
  Button,
  Card,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PrintIcon from "@mui/icons-material/Print";

import { useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { fetchOrders } from "../../features/orders/orderSlice";

import DownloadIcon from "@mui/icons-material/Download";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export default function OrderDetailsPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { id } = useParams();

  const { orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    if (!orders.length) {
      dispatch(fetchOrders());
    }
  }, [dispatch, orders.length]);

  const order = orders.find((o) => String(o.id) === String(id));

  if (loading || !order) {
    return (
      <Box
        sx={{
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <CircularProgress />

        <Typography>Chargement de la commande...</Typography>
      </Box>
    );
  }

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

  const itemsCount = order.items?.reduce(
    (sum, item) => sum + Number(item.quantity),
    0,
  );

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(`Commande #${order.id}`, 14, 20);

    doc.setFontSize(12);

    doc.text(`Client: ${order.first_name} ${order.last_name}`, 14, 35);

    doc.text(`Email: ${order.email}`, 14, 45);

    doc.text(`Telephone: ${order.phone}`, 14, 55);

    doc.text(`Statut: ${getStatusLabel(order.status)}`, 14, 65);

    autoTable(doc, {
      startY: 80,

      head: [["Produit", "Quantité", "Prix", "Total"]],

      body: order.items?.map((item) => [
        item.product_name,

        item.quantity,

        `${item.price} MAD`,

        `${item.total} MAD`,
      ]),
    });

    doc.text(`Total: ${order.total} MAD`, 14, doc.lastAutoTable.finalY + 15);

    doc.save(`commande-${order.id}.pdf`);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,

        "@media print": {
          py: 0,
        },
      }}
    >
      {/* HEADER */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          mb: 4,

          "@media print": {
            mb: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              "@media print": {
                display: "none",
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box>
            <Typography variant="h4" fontWeight={800}>
              Commande #{order.id}
            </Typography>

            <Typography color="text.secondary">
              Créée le {new Date(order.created_at).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Chip
            label={getStatusLabel(order.status)} 
            sx={{
              fontWeight: 700,
              borderRadius: 2,
            }}
          />

          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadPDF}
            sx={{
              borderRadius: 5,
              fontWeight: 700,
            }}
          >
            PDF
          </Button>
        </Box>
      </Box>

      {/* GRID */}

      <Grid container spacing={3}>
        {/* LEFT */}

        <Grid size={{ xs: 12, lg: 8 }}>
          {/* ARTICLES */}

          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              mb: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Liste des articles
            </Typography>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Produit</TableCell>

                    <TableCell>Quantité</TableCell>

                    <TableCell>Prix</TableCell>

                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {order.items?.map((item) => (
                    <TableRow key={item.id}>
                      {/* PRODUCT */}

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box>
                            <Typography fontWeight={700}>
                              {item.product_name}
                            </Typography>

                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              REF #{item.product?.id}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      {/* QUANTITY */}

                      <TableCell>{item.quantity}</TableCell>

                      {/* PRICE */}

                      <TableCell>
                        {Number(item.price).toLocaleString()} MAD
                      </TableCell>

                      {/* TOTAL */}

                      <TableCell
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        {Number(item.total).toLocaleString()} MAD
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>

          {/* SHIPPING */}

          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Informations de livraison
            </Typography>

            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Nom complet
                </Typography>

                <Typography fontWeight={600}>
                  {order.first_name} {order.last_name}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Email
                </Typography>

                <Typography fontWeight={600}>{order.email}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Téléphone
                </Typography>

                <Typography fontWeight={600}>{order.phone}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Pays
                </Typography>

                <Typography fontWeight={600}>{order.country}</Typography>
              </Grid>

              <Grid size={{ xs: 12 }}>
                <Typography variant="body2" color="text.secondary">
                  Adresse
                </Typography>

                <Typography fontWeight={600}>{order.address}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Ville
                </Typography>

                <Typography fontWeight={600}>{order.city}</Typography>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Code postal
                </Typography>

                <Typography fontWeight={600}>{order.postal_code}</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* RIGHT */}

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* CLIENT */}

          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              mb: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Client
            </Typography>

            <Typography variant="h5" fontWeight={800} mb={1}>
              {order.first_name} {order.last_name}
            </Typography>

            <Typography color="text.secondary">{order.email}</Typography>

            <Typography color="text.secondary">{order.phone}</Typography>
          </Card>

          {/* SUMMARY */}

          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Résumé de la commande
            </Typography>

            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="text.secondary">Articles</Typography>

                <Typography fontWeight={700}>{itemsCount}</Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography color="text.secondary">Livraison</Typography>

                <Typography fontWeight={700}>Gratuite</Typography>
              </Box>

              <Divider />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" fontWeight={800}>
                  Total
                </Typography>

                <Typography variant="h5" fontWeight={900} color="primary.main">
                  {Number(order.total).toLocaleString()} MAD
                </Typography>
              </Box>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
