import { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

export const useAdmin = () => useContext(AdminContext);