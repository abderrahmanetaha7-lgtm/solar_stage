import FiltreProducts from "../components/Products/FiltreProducts";
import React, { useMemo, useState } from "react";
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
import { useSelector } from "react-redux";
import ProductCard from "../components/Products/ProductCard";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function Products() {
  const { t } = useTranslation();

  // Get products from Redux store
  const products = useSelector((state) => state.products.products);
  
  // State management for filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [minEfficiency, setMinEfficiency] = useState(0);

  // Theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  // Determine number of grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };

  // Memoized filtered products to optimize performance
  const filtered = useMemo(
    () =>
      products.filter((p) => {
        if (category !== "all" && p.category !== category) return false;

        if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
          return false;

        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

        if (parseFloat(p.efficiency) < minEfficiency) return false;

        return true;
      }),
    [search, category, priceRange, minEfficiency, products], // Dependencies
  );

  return (
    <Box
      sx={{
        py: 10,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: 5,
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mb: 5,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "40px" },
              fontWeight: 600,
              letterSpacing: "-0.5px",
            }}
          >
            {t("productsPage.title")}
          </Typography>

          <Typography
            sx={{
              maxWidth: "500px",
              mx: "auto",
              // fontSize: { xs: "15px", sm: "17px", md: "20px" },
            }}
          >
            {t("productsPage.subtitle")}
          </Typography>
        </Box>

        <FiltreProducts
          value={{
            search,
            setSearch,
            category,
            setCategory,
            priceRange,
            setPriceRange,
            minEfficiency,
            setMinEfficiency,
          }}
        />

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
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>

        {/* No Results Message */}
        {filtered.length === 0 && (
          <Typography
            sx={{
              margin: "20px 0 0 0",
              textAlign: "center",
              mt: 4,
              color: "text.secondary",
            }}
          >
            {t("productsPage.not_found")}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
