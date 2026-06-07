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
  Collapse,
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
  } = value || {};

  const { t } = useTranslation();

  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    {
      value: 0,
      label: "productsPage.category.all",
    },
    {
      value: 1,
      label: "productsPage.category.panels",
    },
    {
      value: 2,
      label: "productsPage.category.batteries",
    },
    {
      value: 3,
      label: "productsPage.category.inverters",
    },
    {
      value: 4,
      label: "productsPage.category.accessories",
    },
  ];

  return (
    <>
      {/* SEARCH + FILTER BUTTON */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: { xs: "column", sm: "row" },
          gap: 1.5,
          width: {
            xs: "100%",
            sm: "85%",
            md: "65%",
          },
          mx: "auto",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t("productsPage.search")}
          value={search ?? ""}
          onChange={(e) => setSearch?.(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: 46,
              borderRadius: "999px",
              backgroundColor: "background.paper",

              "& fieldset": {
                borderColor: "divider",
              },

              "&:hover fieldset": {
                borderColor: "text.primary",
              },

              "&.Mui-focused fieldset": {
                borderColor: "text.primary",
                borderWidth: 2,
              },
            },
          }}
        />

        <Button
          variant="contained"
          startIcon={<Tune />}
          onClick={() => setShowFilters((prev) => !prev)}
          sx={{
            gap:1.2,
            height: 46,
            borderRadius: "999px",
            px: 3,
            textTransform: "none",
            fontWeight: 600,
            minWidth: {
              xs: "100%",
              sm: "auto",
            },
          }}
        >
          {t("productsPage.filters")}
        </Button>
      </Box>

      {/* FILTERS PANEL */}
      <Collapse in={showFilters}>
        <Box
          sx={{
            width: "100%",
            mt: 4,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 4,
            px: { xs: 2, md: 4 },
            py: 4,
            transition: "all 0.3s ease",
          }}
        >
          <Grid container spacing={5}>
            {/* CATEGORY */}
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>{t("productsPage.category.label")}</InputLabel>

                <Select
                  value={category ?? 0}
                  label={t("productsPage.category.label")}
                  onChange={(e) => setCategory?.(e.target.value)}
                  sx={{
                    borderRadius: 3,
                  }}
                >
                  {categories.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                      {t(item.label)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* PRICE RANGE */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="body2"
                sx={{
                  mb: 2,
                  fontWeight: 500,
                }}
              >
                {t("productsPage.price.max")} : <br/> {priceRange?.[0] ?? 0} {t("productsPage.currency")}
                {" - "}{priceRange?.[1] ?? 100000} {t("productsPage.currency")}
              </Typography>

              <Slider
                value={priceRange ?? [0, 100000]}
                min={0}
                max={100000}
                onChange={(e, value) => setPriceRange?.(value)}
                valueLabelDisplay="auto"
              />
            </Grid>
          </Grid>
        </Box>
      </Collapse>

      {/* CATEGORY CHIPS */}
      <Box
        sx={{
          mt: 4,
          mb: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1.2,
          flexWrap: "wrap",
        }}
      >
        {categories.map((item) => (
          <Chip
            key={item.value}
            label={t(item.label)}
            onClick={() => setCategory?.(item.value)}
            color={category === item.value ? "primary" : "default"}
            variant={category === item.value ? "filled" : "outlined"}
            sx={{
              fontWeight: 500,
              borderRadius: "999px",
              px: 1,
            }}
          />
        ))}
      </Box>
    </>
  );
}
