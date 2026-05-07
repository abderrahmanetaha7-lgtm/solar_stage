import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Container,
  Skeleton,
} from "@mui/material";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductCard from "../Products/ProductCard";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMemo } from "react";

const FeaturedProducts = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is mobile size
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Check if screen is tablet size

  const { products = [], loading } = useSelector(
    (state) => state.products || [],
  );

  const getGridColumns = () => {
    if (isMobile) return 1; // 1 column on mobile
    if (isTablet) return 2; // 2 columns on tablet
    return 4; // 4 columns on desktop
  };

  const latestProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);
  }, [products]);

  // Show loading skeletons while products are being fetched
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Header skeletons */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Skeleton
            variant="text"
            width={300}
            height={60}
            sx={{ mx: "auto" }}
          />
          <Skeleton
            variant="text"
            width={200}
            height={30}
            sx={{ mx: "auto" }}
          />
        </Box>
        {/* Products grid skeletons */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
            gap: 3,
          }}
        >
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              variant="rectangular"
              height={400}
              sx={{ borderRadius: 3 }}
            />
          ))}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="overline"
          sx={{
            color: "primary.main",
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          {t("home.products.collection")}
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            mb: 1,
          }}
        >
          {t("home.products.title")}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          {t("home.products.subtitle")}
        </Typography>
      </Box>

      {/* Products Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
          gap: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {latestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>

      {/* View All Button */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          onClick={() => navigate("/products")} // Navigate to products page
          variant="outlined"
          size="large"
          endIcon={
            i18n.language === "ar" ? <ArrowBackIcon /> : <ArrowForwardIcon />
          }
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
              transform: "translateY(-2px)", // Slight lift effect on hover
            },
          }}
        >
          {t("home.products.buttons.view_all")}
        </Button>
      </Box>
    </Container>
  );
};

export default FeaturedProducts;
