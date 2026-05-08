import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/productSlice";

export const useProducts = () => {
  const dispatch = useDispatch();

  const products = useSelector(
    (state) => state.products.products
  );

  const loading = useSelector(
    (state) => state.products.loading
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return { products, loading };
};