import React from "react";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

const CartItem = ({
  item,
  onIncrement,
  onDecrement,
  onDelete,
  isMobile,
  imageErrors,
  handleImageError,
}) => {
  const itemSubtotal = item.price * item.quantity;

  return (
    <Paper
      sx={{
        p: 4,
        mb: 2,
        borderRadius: 5,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 3,
        bgcolor: "background.paper",
        boxShadow: "0 15px 40px rgba(0,0,0,0.06)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          component="img"
          src={imageErrors[item.id] ? "/fallback-image.png" : item.image}
          alt={item.name}
          onError={() => handleImageError(item.id)}
          sx={{
            width: 110,
            height: 110,
            borderRadius: 4,
            objectFit: "cover",
            bgcolor: "grey.200",
          }}
        />
        <Box>
          <Typography variant="h6" fontWeight={700}>
            {item.name}
          </Typography>
          <Typography color="text.secondary">${item.price}</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => onDecrement(item.id)}
            disabled={item.quantity <= 1}
            aria-label={`Decrease quantity of ${item.name}`}
            sx={{
              bgcolor: "action.hover",
              "&:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            <Remove />
          </IconButton>
          <Typography fontWeight={700}>{item.quantity}</Typography>
          <IconButton
            onClick={() => onIncrement(item.id)}
            disabled={item.quantity >= item.maxQuantity}
            aria-label={`Increase quantity of ${item.name}`}
            sx={{
              bgcolor: "action.hover",
              "&:hover": {
                bgcolor: "action.selected",
              },
            }}
          >
            <Add />
          </IconButton>
        </Box>
        <Typography fontWeight={700}>${itemSubtotal.toLocaleString()}</Typography>
        <IconButton
          color="error"
          onClick={() => onDelete(item)}
          aria-label={`Remove ${item.name} from cart`}
        >
          <Delete />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default React.memo(CartItem);