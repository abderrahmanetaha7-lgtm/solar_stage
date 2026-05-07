import { Box, Typography, Button, Card, Grid, IconButton } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

export default function CartStep({
  cartItems,
  updateQuantity,
  removeItem,
  navigate,
  t,
}) {
  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <ShoppingBagIcon sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h5">{t("checkout.emptyCart")}</Typography>
        <Button variant="contained" onClick={() => navigate("/products")}>
          {t("checkout.continueShopping")}
        </Button>
      </Box>
    );
  }

  return cartItems.map((item) => (
    <Card key={item.id} sx={{ mb: 2, p: 1 }}>
      <Grid container alignItems="center" spacing={1}>
        <Grid xs={3}>
          <img src={item.image} alt={item.name} width="100%" />
        </Grid>

        <Grid xs={6}>
          <Typography>{item.name}</Typography>
          <Typography>${item.price}</Typography>
        </Grid>

        <Grid xs={3} display="flex" alignItems="center">
          <IconButton onClick={() => updateQuantity(item.id, -1)}>
            <RemoveIcon />
          </IconButton>

          <Typography>{item.quantity}</Typography>

          <IconButton onClick={() => updateQuantity(item.id, 1)}>
            <AddIcon />
          </IconButton>

          <IconButton onClick={() => removeItem(item.id)}>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  ));
}