import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  useMediaQuery,
  useTheme,
  Container,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "SolarMax Pro 400W",
    price: 899,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&h=300&fit=crop",
    discount: "22.8%",
    category: "PANELS",
    efficiency: "22.8%",
    description: "Premium monocrystalline solar panel with industry-leading efficiency and...",
    createdAt: "2026-04-20",
  },
  {
    id: 2,
    name: "EcoPanel Ultra 350W",
    price: 749,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=300&fit=crop",
    discount: "21.3%",
    category: "PANELS",
    efficiency: "21.3%",
    description: "High-efficiency panel with advanced anti-reflective coating for maximum...",
    createdAt: "2026-04-19",
  },
  {
    id: 3,
    name: "SunForce 500W Commercial",
    price: 1299,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=300&fit=crop",
    discount: "23.5%",
    category: "PANELS",
    efficiency: "23.5%",
    description: "Commercial-grade panel for large installations with unmatched durability.",
    createdAt: "2026-04-18",
  },
  {
    id: 4,
    name: "PowerVault 10kWh",
    price: 4999,
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500&h=300&fit=crop",
    discount: "96%",
    category: "BATTERIES",
    efficiency: "96%",
    description: "Home battery system with intelligent energy management and seamless...",
    createdAt: "2026-04-17",
  },
];

const FeaturedProducts = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  };

  const handleAddToCart = (productId) => {
    // Add your add to cart logic here
    console.log(`Product ${productId} added to cart`);
    // Example: dispatch(addToCart(productId))
  };

  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <Container maxWidth="xl" sx={{ py: 6, px: { xs: 2, sm: 3, md: 4 } }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 5 }}>
        <Typography
          variant="h3"
          component="h2"
          fontWeight="bold"
          sx={{
            fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
            mb: 1,
          }}
        >
          Featured Products
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          Explore our latest solar energy solutions
        </Typography>
      </Box>

      {/* Products Grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
          gap: 3,
        }}
      >
        {latestProducts.map((product) => (
          <Card
            key={product.id}
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-4px)",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
              },
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Image Section */}
            <Box sx={{ position: "relative", pt: "75%", overflow: "hidden" }}>
              <Box
                component="img"
                src={product.image}
                alt={product.name}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              
              {/* Efficiency Badge */}
              <Chip
                icon={<FlashOnIcon sx={{ fontSize: 16, color: "#fff" }} />}
                label={`${product.efficiency}`}
                size="small"
                sx={{
                  position: "absolute",
                  top: 12,
                  left: 12,
                  bgcolor: "#2e7d32",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                  "& .MuiChip-icon": {
                    color: "#fff",
                  },
                }}
              />

              {/* Favorite Button */}
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  bgcolor: "#fff",
                  borderRadius: "50%",
                  p: "6px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                }}
              >
                <FavoriteBorderIcon sx={{ fontSize: 20 }} />
              </Box>
            </Box>

            {/* Content Section */}
            <CardContent sx={{ flexGrow: 1, p: 2 }}>
              {/* Category */}
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontWeight: 600,
                  letterSpacing: "0.5px",
                }}
              >
                {product.category}
              </Typography>

              {/* Product Name */}
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  mt: 1,
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  lineHeight: 1.3,
                  minHeight: { xs: "auto", sm: "2.6rem" },
                }}
              >
                {product.name}
              </Typography>

              {/* Description */}
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  fontSize: "0.8rem",
                  display: { xs: "none", sm: "-webkit-box" },
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "2.5rem",
                }}
              >
                {product.description}
              </Typography>

              <Divider sx={{ my: 1.5 }} />

              {/* Price and Add Button */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  ${product.price.toLocaleString()}
                </Typography>
                
                <Button
                  variant="contained"
                  size="small"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => handleAddToCart(product.id)}
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 3,
                    bgcolor: "#1976d2",
                    "&:hover": {
                      bgcolor: "#1565c0",
                    },
                  }}
                >
                  Add
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* View All Button */}
      <Box sx={{ textAlign: "center", mt: 6 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate("/products")}
          sx={{
            borderRadius: 2,
            px: 5,
            py: 1,
            textTransform: "none",
            fontSize: "1rem",
            borderWidth: 2,
            "&:hover": {
              borderWidth: 2,
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