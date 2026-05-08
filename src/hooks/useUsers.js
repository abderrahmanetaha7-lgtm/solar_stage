import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../features/users/userSlice";

export const useUsers = () => {
  const dispatch = useDispatch();

  const users = useSelector(
    (state) => state.users.users
  );

  const loading = useSelector(
    (state) => state.users.loading
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return { users, loading };
};