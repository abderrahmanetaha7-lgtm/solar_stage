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

import React, { useState } from "react";

export default function FiltreProducts(props) {
  const {
    search,
    setSearch,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    minEfficiency,
    setMinEfficiency,
  } = props.value;

  const categories = [
    { value: "all", label: "Tous les produits" },
    { value: "panels", label: "Panneaux" },
    { value: "batteries", label: "Batteries" },
    { value: "inverters", label: "Onduleurs" },
  ];

  const [showFilters, setShowFilters] = useState(false);

  return (
    <>
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
          placeholder="Rechercher des produits..."
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
          Filtres
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
                <InputLabel>Catégorie</InputLabel>
                <Select
                  sx={{ width: { xs: "100%", sm: "150px" } }}
                  value={category}
                  label="Catégorie"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price Filter Slider */}
            <Grid item xs={12} sm={4}>
              <Typography gutterBottom>Prix max : ${priceRange[1]}</Typography>
              <Slider
                value={priceRange[1]}
                min={0}
                max={10000}
                onChange={(e, val) => setPriceRange(val)}
              />
            </Grid>

            {/* Efficiency Filter Slider */}
            <Grid item xs={12} sm={4}>
              <Typography gutterBottom>
                Efficacité minimale : {minEfficiency}%
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
            key={c.value}
            label={c.label}
            color={category === c.value ? "primary" : "default"}
            onClick={() => setCategory(c.value)}
          />
        ))}
      </Box>
    </>
  );
}
