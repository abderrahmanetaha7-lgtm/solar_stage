import { ShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function EmptyCart() {
    const {t} = useTranslation()
  return (
    <>
      <Container maxWidth="lg" sx={{ py: 10, mt: 3, minHeight: "100vh" }}>
        <Box sx={{ textAlign: "center", py: 8 }}>
          <ShoppingCartOutlined
            sx={{ fontSize: 90, color: "text.secondary", opacity: 0.4, mb: 2 }}
          />
          <Typography variant="h4" fontWeight={800} mb={2}>
            {t("cart.emptyTitle")}
          </Typography>
          <Typography color="text.secondary" mb={4}>
            {t("cart.emptyMessage")}
          </Typography>
          <Button
            variant="contained"
            href="/products"
            sx={{
              borderRadius: "20px",
              mt:2,
              px: 5,
              py: 1.2,
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            {t("cart.continueShopping")}
          </Button>
        </Box>
      </Container>
      ;
    </>
  );
}
