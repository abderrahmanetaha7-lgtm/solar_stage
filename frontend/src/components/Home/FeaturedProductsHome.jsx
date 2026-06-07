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

import ProductCard from "../Products/ProductCard";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useMemo } from "react";
import { useProducts } from "../../hooks/useProducts";
import StaggerContainer from "../motion/StaggerContainer";
import StaggerItem from "../motion/StaggerItem";
import FadeIn from "../motion/FadeIn";

const FeaturedProducts = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate(); // Hook for programmatic navigation
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Check if screen is mobile size
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // Check if screen is tablet size

  const { products, loading } = useProducts();

  const getGridColumns = () => {
    if (isMobile) return 1; // 1 column on mobile
    if (isTablet) return 2; // 2 columns on tablet
    return 4; // 4 columns on desktop
  };

  const latestProducts = useMemo(() => {
    return products
      .filter((product) => Number(product.stock_quantity) > 0)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 4);
  }, [products]);
 

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header Section */}
      <FadeIn>
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
      </FadeIn>

      {/* Products Grid */}
      <StaggerContainer
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
          gap: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {loading
          ? [1,2,3,4].map((_, index) => (
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
          : latestProducts.map((product) => (
              <StaggerItem key={product.id}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
      </StaggerContainer>

      {/* View All Button */}
      {latestProducts.length > 0 && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            onClick={() => navigate("/products")} // Navigate to products page
            variant="outlined"
            size="large"
            endIcon={
              i18n.language === "ar" ? <ArrowBackIcon /> : <ArrowForwardIcon />
            }
            sx={{
              gap:2,
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
      )}
    </Container>
  );
};

export default FeaturedProducts;
