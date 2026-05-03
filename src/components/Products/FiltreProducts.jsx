import React, { useState } from "react";
import {
  Box,
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
import { Tune } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export default function FiltreProducts({ value }) {
  const {
    search,
    setSearch,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    minEfficiency,
    setMinEfficiency,
  } = value || {};

  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { value: "all", label: "productsPage.category.all" },
    { value: "panels", label: "productsPage.category.panels" },
    { value: "batteries", label: "productsPage.category.batteries" },
    { value: "inverters", label: "productsPage.category.inverters" },
  ];

  return (
    <>
      {/* Search + Filter Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: { xs: "100%", sm: "80%", md: "60%" },
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          alignItems: "center",
          mx: "auto",
        }}
      >
        <TextField
          variant="outlined"
          placeholder={t("productsPage.search")}
          value={search ?? ""}
          onChange={(e) => setSearch?.(e.target.value)}
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
          onClick={() => setShowFilters((prev) => !prev)}
          sx={{
            height: "44px",
            borderRadius: "50px",
            textTransform: "none",
            px: 3,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {t("productsPage.filters")}
        </Button>
      </Box>

      {/* Filters Panel */}
      {showFilters && (
        <Box
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 4,
            py: 4,
            px: 3,
            minHeight: { xs: 140, sm: 130, md: 120 },
          }}
        >
          <Grid
            container
            spacing={3}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Category */}
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>
                  {t("productsPage.category.label")}
                </InputLabel>
                <Select
                  value={category ?? "all"}
                  label={t("productsPage.category.label")}
                  onChange={(e) => setCategory?.(e.target.value)}
                >
                  {categories.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {t(c.label)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Price */}
            <Grid item xs={12} sm={4}>
              <Typography sx={{ mb: 1 }}>
                {t("productsPage.price.max")} : ${priceRange?.[1] ?? 0}
              </Typography>

              <Slider
                value={priceRange?.[1] ?? 0}
                min={0}
                max={10000}
                onChange={(e, val) => {
                  if (Array.isArray(priceRange) && typeof val === "number") {
                    setPriceRange?.([priceRange[0], val]);
                  }
                }}
              />
            </Grid>

            {/* Efficiency */}
            <Grid item xs={12} sm={4}>
              <Typography sx={{ mb: 1 }}>
                {t("productsPage.efficiency.min")} : {minEfficiency ?? 0}%
              </Typography>

              <Slider
                value={minEfficiency ?? 0}
                min={0}
                max={100}
                onChange={(e, val) => {
                  if (typeof val === "number") {
                    setMinEfficiency?.(val);
                  }
                }}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {/* Category Chips */}
      <Box
        sx={{
          mt: 3,
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mb: 5,
          flexWrap: "wrap",
        }}
      >
        {categories.map((c) => (
          <Chip
            key={c.value}
            label={t(c.label)}
            color={category === c.value ? "primary" : "default"}
            onClick={() => setCategory?.(c.value)}
          />
        ))}
      </Box>
    </>
  );
}