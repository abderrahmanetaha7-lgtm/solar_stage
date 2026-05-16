import FiltreProducts from "../components/Products/FiltreProducts";
import React, { useMemo, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Skeleton } from "@mui/material";
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
import ProductCard from "../components/Products/ProductCard";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useProducts } from "./../hooks/useProducts";
import { Helmet } from "react-helmet-async";

export default function Products() {
  const { t, i18n } = useTranslation();

  // Get products from Redux store
  const { products, loading } = useProducts();

  // State management for filters
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 10000]);

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
        // STOCK
        if (Number(p.stock_quantity) <= 0) return false;

        // CATEGORY
        if (category !== 0 && p.category?.id !== category) return false;

        // SEARCH
        if (search && !p.name?.toLowerCase().includes(search.toLowerCase()))
          return false;

        // PRICE
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;

        return true;
      }),
    [search, category, priceRange, products],
  );

  const skeletons = Array.from(new Array(12));

  return (
    <>
      <Helmet>
        <title>
          {i18n.language === "ar"
            ? "منتجات الطاقة الشمسية | ألواح وبطاريات ومحولات"
            : "Produits solaires | Panneaux, batteries et onduleurs"}
        </title>

        <meta
          name="description"
          content={
            i18n.language === "ar"
              ? "اكتشف جميع منتجات الطاقة الشمسية: ألواح شمسية، بطاريات، محولات بأسعار مناسبة."
              : "Découvrez tous les produits solaires: panneaux, batteries, onduleurs à prix compétitifs."
          }
        />

        <meta name="robots" content="index, follow" />
      </Helmet>

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
            {loading
              ? skeletons.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      borderRadius: 5,
                      overflow: "hidden",
                      bgcolor: "background.paper",
                      boxShadow: (theme) =>
                        theme.palette.mode === "dark"
                          ? "0 8px 30px rgba(0,0,0,0.35)"
                          : "0 8px 30px rgba(0,0,0,0.08)",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{
                        width: "100%",
                        height: 400,

                        bgcolor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "rgba(255,255,255,0.06)"
                            : "rgba(0,0,0,0.06)",
                      }}
                    />
                  </Box>
                ))
              : filtered.map((product) => (
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
    </>
  );
}
