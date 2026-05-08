import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalytics } from "../features/analytics/analyticsSlice";

export const useAnalytics = () => {
  const dispatch = useDispatch();

  const analytics = useSelector(
    (state) => state.analytics
  );

  const loading = useSelector(
    (state) => state.analytics.loading
  );

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return { ...analytics, loading };
};