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
  // Get products from global context
  const { products } = useProducts();

  // Theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Screen < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Screen between 600px and 960px

  // Determine number of grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return 1;     // 1 column on mobile
    if (isTablet) return 2;     // 2 columns on tablet
    return 4;                   // 4 columns on desktop
  };

  // Available product categories
  const categories = ["all", "panels", "batteries", "inverters"];
  
  // State management for filters
  const [search, setSearch] = useState("");           // Search query
  const [category, setCategory] = useState("all");    // Selected category
  const [priceRange, setPriceRange] = useState([0, 10000]); // Price range [min, max]
  const [minEfficiency, setMinEfficiency] = useState(0);    // Minimum efficiency filter
  const [showFilters, setShowFilters] = useState(false);    // Toggle filters visibility

  // Memoized filtered products to optimize performance
  const filtered = useMemo(
    () =>
      products.filter((p) => {
        // Filter by category (skip if "all" is selected)
        if (category !== "all" && p.category !== category) return false;
        
        // Filter by search query (case-insensitive)
        if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
          return false;
        
        // Filter by price range
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
        
        // Filter by minimum efficiency
        if (p.efficiency < minEfficiency) return false;
        
        return true;
      }),
    [search, category, priceRange, minEfficiency, products], // Dependencies
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        py: { xs: 6, sm: 8, md: 12 },
        flex: 1, // Allows content to expand
        minHeight: "100vh", // Ensures full height coverage
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 3,
        }}
      >
        {/* Header Section */}
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

        {/* Search Bar + Filters Toggle Button */}
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
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Filters
          </Button>
        </Box>

        {/* Expandable Filters Panel */}
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
              {/* Category Filter Dropdown */}
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    sx={{ width: { xs: "100%", sm: "150px" } }}
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories.map((c) => (
                      <MenuItem key={c} value={c}>
                        {c === "all" ? "All" : c}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Price Filter Slider */}
              <Grid item xs={12} sm={4}>
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

              {/* Efficiency Filter Slider */}
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

        {/* Category Chips for Quick Filtering */}
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

        {/* Products Grid Display */}
        <Box
          sx={{
            mt: 4,
            width: "100%",
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

        {/* No Results Message */}
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