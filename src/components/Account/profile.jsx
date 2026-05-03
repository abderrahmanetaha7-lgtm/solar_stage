import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Divider,
} from "@mui/material";
import { useAuth } from "../../context/AuthContextToken";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

export default function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation();

  const [showEditProfile, setShowEditProfile] = useState(false);

  function handleShowEditProfile() {
    setShowEditProfile(true);
  }

  function handleCloseEditProfile() {
    setShowEditProfile(false);
  }
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 4,
        color: "white",
        border: "1px solid #2a2a2a",
      }}
    >
      {/* MAIN CONTAINER */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 3, md: 0 }}
        sx={{
          alignItems: { xs: "center", md: "center" },
          justifyContent: "space-between",
        }}
      >
        {/* LEFT SIDE */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2.5}
          sx={{
            alignItems: { xs: "center", sm: "center", md: "left" },
            flex: 1,
            textAlign: { xs: "center", sm: "left", md: "left" },
          }}
        >
          {/* AVATAR */}
          <Avatar
            sx={{
              bgcolor: "orange",
              width: { xs: 90, sm: 100 },
              height: { xs: 90, sm: 100 },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "48px", sm: "64px" },
                lineHeight: 1,
              }}
            >
              {user?.email?.charAt(0).toUpperCase()}
            </Typography>
          </Avatar>

          {/* USER INFO */}
          <Box sx={{ alignItems: "center" }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ fontSize: { xs: "20px", sm: "24px" } }}
            >
              {user?.name || "stage web"}
            </Typography>

            <Typography sx={{ opacity: 0.6 }}>{user?.email}</Typography>
          </Box>
        </Stack>

        {/* ACTION BUTTONS */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: { xs: "100%", md: "auto" }, justifyContent: "center" }}
        >
          <Button
            onClick={handleShowEditProfile}
            fullWidth
            variant="contained"
            sx={{
              borderRadius: 3,
              textTransform: "none",
              height: "42px",
              whiteSpace: "nowrap",
              minWidth: { sm: "160px" },
            }}
          >
            {t("account.editProfile")}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            color="inherit"
            sx={{
              borderRadius: 3,
              textTransform: "none",
              borderColor: "#444",
              height: "42px",
            }}
          >
            {t("account.signOut")}
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3, borderColor: "#2a2a2a" }} />

      <EditProfileDialog
        open={showEditProfile}
        onClose={handleCloseEditProfile}
      />
    </Paper>
  );
}
