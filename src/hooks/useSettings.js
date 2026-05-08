import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchSettings,
  updateSettings,
} from "../features/settings/settingsSlice";

export const useSettings = () => {
  const dispatch = useDispatch();

  const settings = useSelector(
    (state) => state.settings.settings
  );

  const loading = useSelector(
    (state) => state.settings.loading
  );

  const error = useSelector(
    (state) => state.settings.error
  );

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  const saveSettings = async (data) => {
    return await dispatch(updateSettings(data));
  };

  return {
    settings,
    loading,
    error,
    saveSettings,
  };
};