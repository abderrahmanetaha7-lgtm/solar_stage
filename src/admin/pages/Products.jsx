import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  InputAdornment,
  TextField,
  Chip,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";


import { useNavigate } from "react-router-dom";
import {
  Add as PlusIcon,
  Search as SearchIcon,
  Edit as PencilIcon,
  Delete as TrashIcon,
} from "@mui/icons-material";

import PageHeader from "../components/PageHeader";
import { removeProduct } from "../../features/products/productSlice";
import { useDispatch } from "react-redux";
import { useProducts } from "../../hooks/useProducts";

/* ================= STATUS AUTO CALC ================= */
const getStatus = (stock) => {
  if (stock <= 0) return { color: "error", label: "Rupture de stock" };
  if (stock <= 5) return { color: "warning", label: "Stock faible" };
  return { color: "success", label: "En stock" };
};

function ProductsPage() {
  const { products, loading } = useProducts();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  /* ================= SEARCH ================= */
  const filteredProducts = products.filter((product) =>
    (product.productName || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

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

  return (
    <>
      {/* HEADER */}
      <PageHeader
        title="Produits"
        description="Gérez votre catalogue de produits"
        actions={
          <Button
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={() => navigate("/admin/add-product")}
            sx={{
              background: "primary.main",
            }}
          >
            Ajouter un produit
          </Button>
        }
      />

      {/* SEARCH */}
      <Card sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Rechercher des produits..."
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
      <Card>
        <TableContainer component={Paper}>
          <Table>
            {/* HEADER */}
            <TableHead>
              <TableRow>
                <TableCell>Produit</TableCell>
                <TableCell>Catégorie</TableCell>
                <TableCell>Prix</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* BODY */}
            <TableBody>
              {filteredProducts.map((product) => {
                const status = getStatus(product.stockQuantity);

                return (
                  <TableRow key={product.id} hover>
                    {/* PRODUCT */}
                    <TableCell>
                      <Box>
                        <Typography fontWeight={600}>
                          {product.productName}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {product.id}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* CATEGORY */}
                    <TableCell>{product.category}</TableCell>

                    {/* PRICE */}
                    <TableCell>${product.price}</TableCell>

                    {/* STOCK */}
                    <TableCell>{product.stockQuantity}</TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <Chip
                        label={status.label}
                        color={status.color}
                        size="small"
                      />
                    </TableCell>

                    {/* ACTIONS */}
                    <TableCell align="right">
                      <Stack direction="row" justifyContent="flex-end">
                        {/* EDIT */}
                        <IconButton
                          size="small"
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
                          onClick={async () => {
                            if (
                              window.confirm(
                                "Êtes-vous sûr de vouloir supprimer ce produit ?",
                              )
                            ) {
                              await dispatch(removeProduct(product.id));
                            }
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
    </>
  );
}

export default ProductsPage;
