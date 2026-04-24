import React, { useState, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  Slider,
  InputLabel,
  FormControl,
  Chip,
  useMediaQuery,
} from "@mui/material";
import { Search, Tune } from "@mui/icons-material";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { useTheme } from "@mui/material/styles";

export default function Products({ handleAddToCart }) {
  const { products } = useProducts();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };

  const categories = ["all", "panels", "batteries", "inverters"];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minEfficiency, setMinEfficiency] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (category !== "all" && p.category !== category) return false;
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
          return false;
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
        if (p.efficiency < minEfficiency) return false;
        return true;
      }),
    [search, category, priceRange, minEfficiency],
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 12,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "300px",
          py: 3,
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            sx={{ mb: 0, fontSize: { xs: "35px", sm: "40px", md: "50px" } }}
            variant="h3"
            fontWeight="bold"
            gutterBottom
          >
            Our Products
          </Typography>

          <Typography
            color="text.secondary"
            variant="h6"
            sx={{ fontSize: { xs: "15px", sm: "17px", md: "20px" } }}
          >
            Premium solar energy solutions for every need
          </Typography>
        </Box>

        {/* Search + Filters */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: { xs: "100%", sm: "80%", md: "60%" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 1.5,
            alignItems: "center",
          }}
        >
          {/* Search Input */}
          <TextField
            variant="outlined"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                height: "44px",

                "&.Mui-focused fieldset": {
                  borderColor: "text.primary",
                  borderWidth: "2px",
                },
              },
            }}
          />

          {/* Button */}
          <Button
            variant="contained"
            startIcon={<Tune />}
            onClick={() => setShowFilters(!showFilters)}
            fullWidth={false}
            sx={{
              height: "44px",
              borderRadius: "50px",
              textTransform: "none",
              px: 3,
              width: { xs: "100%", sm: "auto" }, // 👈 full width on mobile
            }}
          >
            Filters
          </Button>
        </Box>

        {/* Filters */}
        {showFilters && (
          <Box
            mb={5}
            p={3}
            sx={{
              border: "1px solid #ddd",
              borderRadius: 2,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Grid
              container
              spacing={3}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    sx={{ width: "150px" }}
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <MenuItem key={c} value={c} sx={{ width: "150px" }}>
                        {c === "all" ? "All" : c}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={4} sx={{ width: "150px" }}>
                <Typography gutterBottom>
                  Max Price: ${priceRange[1]}
                </Typography>
                <Slider
                  value={priceRange[1]}
                  min={0}
                  max={10000}
                  onChange={(e, val) => setPriceRange([0, val])}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography gutterBottom>
                  Min Efficiency: {minEfficiency}%
                </Typography>
                <Slider
                  value={minEfficiency}
                  min={0}
                  max={100}
                  onChange={(e, val) => setMinEfficiency(val)}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Category Chips */}
        <Box
          sx={{ mt: "20px" }}
          display="flex"
          justifyContent="center"
          gap={1}
          mb={5}
          flexWrap="wrap"
        >
          {categories.map((c) => (
            <Chip
              key={c}
              label={c === "all" ? "All Products" : c}
              color={category === c ? "primary" : "default"}
              onClick={() => setCategory(c)}
            />
          ))}
        </Box>

        <Box
          sx={{
            mt:4,
            display: "grid",
            gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </Box>

        {/* Results */}
        {filtered.length === 0 && (
          <Typography
            textAlign="center"
            mt={4}
            color="text.secondary"
            sx={{ margin: "20px 0 0 0" }}
          >
            No products match your filters.
          </Typography>
        )}
      </Container>
    </Box>
  );
}
