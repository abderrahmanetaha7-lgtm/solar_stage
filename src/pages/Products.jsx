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
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/Products/ProductCard";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export default function Products({ handleAddToCart }) {
  const { t } = useTranslation();
  
  // Get products from global context
  const { products } = useProducts();

  // State management for filters
  const [search, setSearch] = useState(""); // Search query
  const [category, setCategory] = useState("all"); // Selected category
  const [priceRange, setPriceRange] = useState([0, 10000]); // Price range [min, max]
  const [minEfficiency, setMinEfficiency] = useState(0); // Minimum efficiency filter

  // Theme and responsive breakpoints
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Screen < 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Screen between 600px and 960px

  // Determine number of grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return 1; // 1 column on mobile
    if (isTablet) return 2; // 2 columns on tablet
    return 4; // 4 columns on desktop
  };

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
            {t("productsPage.not_found")}
          </Typography>
        )}
      </Container>
    </Box>
  );
}
