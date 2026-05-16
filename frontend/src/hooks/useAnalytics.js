import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchAnalytics } from "../features/analytics/analyticsSlice";

export const useAnalytics = () => {
  const dispatch = useDispatch();

  const { salesData, categoryData, topProducts, stats, loading, error } =
    useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return {
    salesData,
    categoryData,
    topProducts,
    stats,
    loading,
    error,
  };
};
