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
} from "@mui/material";
import { Search, Tune } from "@mui/icons-material";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "SolarMax Pro 400W",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&h=300&fit=crop",
      discount: "22.8%",
      category: "PANELS",
      efficiency: "22.8%",
      description:
        "Premium monocrystalline solar panel with industry-leading efficiency and...",
      createdAt: "2026-04-20",
    },
    {
      id: 2,
      name: "EcoPanel Ultra 350W",
      price: 749,
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=300&fit=crop",
      discount: "21.3%",
      category: "PANELS",
      efficiency: "21.3%",
      description:
        "High-efficiency panel with advanced anti-reflective coating for maximum...",
      createdAt: "2026-04-19",
    },
    {
      id: 3,
      name: "SunForce 500W Commercial",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=300&fit=crop",
      discount: "23.5%",
      category: "PANELS",
      efficiency: "23.5%",
      description:
        "Commercial-grade panel for large installations with unmatched durability.",
      createdAt: "2026-04-18",
    },
    {
      id: 4,
      name: "PowerVault 10kWh",
      price: 4999,
      image:
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500&h=300&fit=crop",
      discount: "96%",
      category: "BATTERIES",
      efficiency: "96%",
      description:
        "Home battery system with intelligent energy management and seamless...",
      createdAt: "2026-04-17",
    },
  ];

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
            sx={{ mb: 0,fontSize:{ xs: "35px", sm: "40px", md: "50px" } }}
            variant="h3"
            fontWeight="bold"
            gutterBottom
          >
            Our Products
          </Typography>

          <Typography color="text.secondary" variant="h6" sx={{ fontSize:{ xs: "15px", sm: "17px", md: "20px" } }}>
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
