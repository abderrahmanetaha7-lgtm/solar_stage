import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Container,
  Skeleton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const { products, loading } = useProducts();

  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };

  const handleAddToCart = (productId) => { 
    console.log(`Product ${productId} added to cart`); 
  };

  
  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

    
  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Skeleton variant="text" width={300} height={60} sx={{ mx: "auto" }} />
          <Skeleton variant="text" width={200} height={30} sx={{ mx: "auto" }} />
        </Box>
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
          Our Collection
        </Typography>
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "2rem", md: "2.5rem" },
            mb: 1,
          }}
        >
          Featured Products
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 600, mx: "auto" }}
        >
          Explore our latest solar energy solutions designed for maximum efficiency
          and sustainability
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
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </Box>

      {/* View All Button */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          onClick={() => navigate("/products")}
          variant="outlined"
          size="large"
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
              transform: "translateY(-2px)",
            },
          }}
        >
          View All Products →
        </Button>
      </Box>
    </Container>
  );
};

export default FeaturedProducts;