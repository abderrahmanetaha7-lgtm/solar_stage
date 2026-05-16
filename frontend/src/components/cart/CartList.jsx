// CartList.jsx

import { Box } from "@mui/material";

import CartItemCard from "./CartItemCard";

import useCart from "../../hooks/useCart";

export default function CartList() {
  const {
    cartItems,
    increment,
    decrement,
    remove,
    getImageUrl,
    getProductName,
  } = useCart();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {cartItems.map((item) => (
        <CartItemCard
          key={item.id}
          item={item}
          imageUrl={getImageUrl(item)}
          productName={getProductName(item)}
          onIncrement={() => increment(item)}
          onDecrement={() => decrement(item)}
          onDelete={() => remove(item.id)}
        />
      ))}
    </Box>
  );
}
