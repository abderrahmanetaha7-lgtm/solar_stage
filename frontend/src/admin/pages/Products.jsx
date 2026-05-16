import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  Add as PlusIcon,
  Delete as TrashIcon,
  Edit as PencilIcon,
  Search as SearchIcon,
  Visibility as EyeIcon,
} from "@mui/icons-material";

import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import { removeProduct } from "../../features/products/productSlice";

import { useProducts } from "../../hooks/useProducts";

import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";

/* ================= STATUS ================= */

const getStatus = (stock) => {
  if (stock <= 0) {
    return {
      color: "error",
      label: "Rupture",
    };
  }

  if (stock <= 5) {
    return {
      color: "warning",
      label: "Faible",
    };
  }

  return {
    color: "success",
    label: "Disponible",
  };
};

/* ================= PRICE FORMAT ================= */

const formatPrice = (price) => {
  const number = Number(price);

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number;
};

function ProductsPage() {
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const { products = [], loading } = useProducts();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  /* ================= SEARCH ================= */

  const filteredProducts = products.filter((product) =>
    (product.name_fr || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <Loading />;
  }

  
  return (
    <>
      {/* HEADER */}

      <PageHeader
        title="Produits"
        description="Gestion du catalogue produits."
        actions={
          <Button
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={() => navigate("/admin/add-product")}
          >
            Ajouter
          </Button>
        }
      />

      {/* SEARCH */}

      <Card
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          boxShadow: "none",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <TextField
          fullWidth
          size="small"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Card>

      {/* TABLE */}

      <Card
        sx={{
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            {/* HEAD */}

            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>

                <TableCell>Produit</TableCell>

                <TableCell>Catégorie</TableCell>

                <TableCell align="center">Prix</TableCell>

                <TableCell align="center">Stock</TableCell>

                <TableCell align="center">Statut</TableCell>

                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* BODY */}

            <TableBody>
              {filteredProducts.map((product) => {
                const status = getStatus(product.stock_quantity);

                return (
                  <TableRow key={product.id} hover>
                    {/* ID */}

                    <TableCell>
                      <Typography variant="body2" fontWeight={600}>
                        #{product.id}
                      </Typography>
                    </TableCell>

                    {/* PRODUCT */}

                    <TableCell>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ alignItems: "center" }}
                      >
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
                        </Box>
                      </Stack>
                    </TableCell>

                    {/* CATEGORY */}

                    <TableCell>{product.category?.name}</TableCell>

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
                        color={
                          product.stock_quantity <= 5
                            ? "error.main"
                            : "text.primary"
                        }
                      >
                        {product.stock_quantity}
                      </Typography>
                    </TableCell>

                    {/* STATUS */}

                    <TableCell align="center">
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                        variant="outlined"
                        sx={{
                          fontWeight: 600,
                        }}
                      />
                    </TableCell>

                    {/* ACTIONS */}

                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ justifyContent: "flex-end" }}
                      >
                        {/* DETAILS */}

                        <IconButton
                          size="small"
                          color="info"
                          onClick={() =>
                            navigate(`/admin/product-detail/${product.id}`)
                          }
                        >
                          <EyeIcon fontSize="small" />
                        </IconButton>

                        {/* EDIT */}

                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() =>
                            navigate(`/admin/edit-product/${product.id}`)
                          }
                        >
                          <PencilIcon fontSize="small" />
                        </IconButton>

                        {/* DELETE */}

                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {
                            setSelectedProduct(product);

                            setOpenDelete(true);
                          }}
                        >
                          <TrashIcon fontSize="small" />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
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
        <DialogTitle
          sx={{
            fontWeight: 700,
          }}
        >
          Supprimer le produit
        </DialogTitle>

        <DialogContent>
          <DialogContentText>Cette action est irréversible.</DialogContentText>

          {selectedProduct && (
            <Typography
              sx={{
                mt: 2,
                fontWeight: 600,
              }}
            >
              {selectedProduct.name_fr}
            </Typography>
          )}
        </DialogContent>

        <DialogActions
          sx={{
            p: 2,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              setOpenDelete(false);

              setSelectedProduct(null);
            }}
          >
            Annuler
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={async () => {
              if (!selectedProduct) return;

              await dispatch(removeProduct(selectedProduct.id));

              setOpenDelete(false);

              setSelectedProduct(null);
            }}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ProductsPage;
