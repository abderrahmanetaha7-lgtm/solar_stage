import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../features/orders/orderSlice";

export const useOrders = () => {
  const dispatch = useDispatch();

  const orders = useSelector(
    (state) => state.orders.orders
  );

  const loading = useSelector(
    (state) => state.orders.loading
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  return { orders, loading };
};