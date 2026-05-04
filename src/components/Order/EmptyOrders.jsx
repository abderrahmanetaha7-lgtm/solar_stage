import { Box, Typography, Button, Container, Paper } from "@mui/material";
import { ShoppingBagOutlined as ShoppingBagIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export default function EmptyOrders() {
  const Navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: 5,
        }}
      >
        {/* Shopping Bag Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            bgcolor: "#f5f5f5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <ShoppingBagIcon
            sx={{
              fontSize: 40,
              color: "#9e9e9e",
            }}
          />
        </Box>

        {/* Subtitle / Message */}
        <Typography
          variant="body1"
          sx={{
            fontSize: "27px",
            color: "#757575",
            mb: 3,
            maxWidth: 280,
            mx: "auto",
          }}
        >
          {t("emptyOrders.title")}
        </Typography>

        {/* Description Text */}
        <Typography
          variant="body2"
          sx={{
            color: "#9e9e9e",
            mb: 4,
            maxWidth: 320,
            mx: "auto",
          }}
        >
          {t("emptyOrders.description")}
        </Typography>

        {/* CTA Button */}
        <Button
          onClick={() => Navigate("/products")}
          variant="contained"
          sx={{
            bgcolor: "primary.main",
            px: 4,
            borderRadius: 2,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: 500,
            "&:hover": {
              bgcolor: "#3333335b",
              border: "2px solid",
            },
          }}
        >
          {t("emptyOrders.cta")}
        </Button>
      </Box>
    </Container>
  );
}
