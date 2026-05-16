import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { clearCart, removeFromCart, updateQuantity } from "../features/cart/cartSlice";

export default function useCart() {
  const dispatch = useDispatch();

  const { i18n } = useTranslation();

  const cartItems = useSelector((state) => state.cart.cart);

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const totalArticles = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const increment = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      }),
    );
  };

  const decrement = (item) => {
    if (item.quantity <= 1) return;

    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1,
      }),
    );
  };

  const remove = (id) => {
    dispatch(removeFromCart(id));
  };

  const clear = () => {
    dispatch(clearCart());
  };

  const getProductName = (item) => {
    return i18n.language === "ar"
      ? item.name_ar || item.name_fr
      : item.name_fr || item.name_ar;
  };

  const getImageUrl = (item) => {
    if (
      item.images &&
      item.images.length > 0 &&
      item.images[0]?.image
    ) {
      return `${import.meta.env.VITE_API_URL}/storage/${item.images[0].image}`;
    }

    return null;
  };

  return {
    cartItems,
    total,
    totalArticles,

    increment,
    decrement,
    remove,
    clear,

    getProductName,
    getImageUrl,
  };
}