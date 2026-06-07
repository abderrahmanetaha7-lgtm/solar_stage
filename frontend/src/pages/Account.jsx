import Profile from "../components/Account/profile";
import AccountSettings from "../components/Account/AccountSettings";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import Loading from "../admin/components/Loading";

const MotionBox = motion.create(Box);

export default function Account() {
  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loading />;
  }

  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      sx={{
        mt: 8,
        p: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 3,
      }}
    >
      <Profile />
      <AccountSettings />
    </MotionBox>
  );
}
