import React from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
 

import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";

import { useProducts } from "../../hooks/useProducts";

/* ================= PRICE FORMAT ================= */

function formatPrice(price) {
  const number = Number(price);

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number;
}

/* ================= STATUS ================= */

function getStatus(stock) {
  if (stock <= 0) {
    return {
      label: "Rupture",
      color: "error",
    };
  }

  if (stock <= 5) {
    return {
      label: "Faible",
      color: "warning",
    };
  }

  if (stock <= 20) {
    return {
      label: "Moyen",
      color: "info",
    };
  }

  return {
    label: "Disponible",
    color: "success",
  };
}

export default function InventoryPage() { 

  const { products = [], loading } = useProducts();

  /* ================= DATA ================= */

  const outOfStock = products.filter((p) => Number(p.stock_quantity) <= 0);

  const lowStock = products.filter(
    (p) => Number(p.stock_quantity) > 0 && Number(p.stock_quantity) <= 5,
  );

  const totalProducts = products.length;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {/* HEADER */}

      <PageHeader
        title="Inventaire"
        description="Gestion et suivi des stocks produits."
      />

      {/* KPI CARDS */}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* LEFT */}

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Produits
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="warning.main"
                    sx={{ mt: 1 }}
                  >
                    {totalProducts}
                  </Typography>
                </Box>

                {/* RIGHT ICON */}
                <Inventory2OutlinedIcon
                  sx={{
                    fontSize: 28,
                  }}
                  color="primary"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* LOW STOCK */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* LEFT */}

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Stock faible
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="warning.main"
                    sx={{ mt: 1 }}
                  >
                    {lowStock.length}
                  </Typography>
                </Box>

                {/* RIGHT ICON */}

                <WarningAmberIcon
                  sx={{
                    color: "warning.main",
                    fontSize: 28,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* OUT OF STOCK */}

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                {/* LEFT */}

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Rupture de stock
                  </Typography>

                  <Typography
                    variant="h4"
                    fontWeight={700}
                    color="error.main"
                    sx={{ mt: 1 }}
                  >
                    {outOfStock.length}
                  </Typography>
                </Box>

                {/* RIGHT ICON */}

                <TrendingDownOutlinedIcon
                  sx={{
                    color: "error.main",
                    fontSize: 28,
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* TABLE */}

      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produit</TableCell>

                <TableCell>Catégorie</TableCell>

                <TableCell align="center">Prix</TableCell>

                <TableCell align="center">Stock</TableCell>

                <TableCell align="center">Niveau</TableCell>

                <TableCell align="center">Statut</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((product) => {
                const stock = Number(product.stock_quantity || 0);

                const status = getStatus(stock);

                return (
                  <TableRow key={product.id} hover>
                    {/* PRODUCT */}

                    <TableCell>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar
                          src={
                            product.images?.[0]?.image
                              ? `${import.meta.env.VITE_API_URL}/storage/${product.images[0].image}`
                              : ""
                          }
                          variant="rounded"
                          sx={{
                            width: 55,
                            height: 55,
                          }}
                        />

                        <Box>
                          <Typography fontWeight={700}>
                            {product.name_fr}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            #{product.id}
                          </Typography>
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* CATEGORY */}

                    <TableCell>{product.category?.name || "—"}</TableCell>

                    {/* PRICE */}

                    <TableCell align="center">
                      <Typography fontWeight={700}>
                        {formatPrice(product.price)} MAD
                      </Typography>
                    </TableCell>

                    {/* STOCK */}

                    <TableCell align="center">
                      <Typography
                        fontWeight={700}
                        color={stock <= 5 ? "error.main" : "text.primary"}
                      >
                        {stock}
                      </Typography>
                    </TableCell>

                    {/* LEVEL */}

                    <TableCell align="center">
                      <Box
                        sx={{
                          width: 120,
                          mx: "auto",
                        }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={stock >= 100 ? 100 : stock}
                          color={status.color}
                          sx={{
                            height: 8,
                            borderRadius: 999,
                          }}
                        />
                      </Box>
                    </TableCell>

                    {/* STATUS */}

                    <TableCell align="center">
                      <Chip
                        label={status.label}
                        color={status.color}
                        variant="outlined"
                        sx={{
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}
