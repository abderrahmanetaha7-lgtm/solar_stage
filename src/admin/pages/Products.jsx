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

import { useNavigate } from "react-router-dom";
import {
  Add as PlusIcon,
  Search as SearchIcon,
  Edit as PencilIcon,
  Delete as TrashIcon,
} from "@mui/icons-material";

import PageHeader from "../components/PageHeader";
import { useAdmin } from "../hooks/useAdmin";

/* ================= STATUS AUTO CALC ================= */
const getStatus = (stock) => {
  if (stock <= 0) return { color: "error", label: "Out of Stock" };
  if (stock <= 5) return { color: "warning", label: "Low Stock" };
  return { color: "success", label: "In Stock" };
};

function ProductsPage() {
  const { products, removeProduct } = useAdmin();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  /* ================= SEARCH ================= */
  const filteredProducts = products.filter((product) =>
    (product.productName || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* HEADER */}
      <PageHeader
        title="Products"
        description="Manage your product catalog"
        actions={
          <Button
            variant="contained"
            startIcon={<PlusIcon />}
            onClick={() => navigate("/admin/add-product")}
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          >
            Add Product
          </Button>
        }
      />

      {/* SEARCH */}
      <Card sx={{ p: 2, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search products..."
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
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
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
                    <TableCell>
                      {product.category}
                    </TableCell>

                    {/* PRICE */}
                    <TableCell>
                      ${product.price}
                    </TableCell>

                    {/* STOCK */}
                    <TableCell>
                      {product.stockQuantity}
                    </TableCell>

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
                                "Are you sure you want to delete this product?"
                              )
                            ) {
                              await removeProduct(product.id);
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