import Profile from "../components/Account/profile";
import AccountSettings from "../components/Account/AccountSettings";
import { Box } from "@mui/material";

export default function Account() {
  return (
    <Box
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
    </Box>
  );
}
