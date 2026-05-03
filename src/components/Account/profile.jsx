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

export default function Profile() {
  const { user } = useAuth();
  const { t } = useTranslation();

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
        alignItems={{ xs: "center", md: "center" }}
        spacing={{ xs: 3, md: 0 }}
        justifyContent="space-between"
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
          <Box>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ fontSize: { xs: "20px", sm: "24px" } }}
            >
              {user?.name || "Omar ART"}
            </Typography>

            <Typography sx={{ opacity: 0.6 }}>{t("account.email")}: {user?.email}</Typography>

            <Typography sx={{ opacity: 0.6 }}>{t("account.city")}: tinghir</Typography>
          </Box>
        </Stack>

        {/* ACTION BUTTONS */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          width={{ xs: "100%", md: "auto" }}
          justifyContent="center"
        >
          <Button
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
    </Paper>
  );
}
