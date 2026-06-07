import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  Divider,
} from "@mui/material";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../features/auth/authSlice";

import { useTranslation } from "react-i18next";

import { useState } from "react";
import { motion } from "framer-motion";

import EditProfileDialog from "./EditProfileDialog";
import ProfileSkeleton from "../skeleton/ProfileSkeleton";

const MotionPaper = motion.create(Paper);

export default function Profile() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const user = useSelector((state) => state.auth.user);
  const checkingAuth = useSelector((state) => state.auth.checkingAuth);

  const [showEditProfile, setShowEditProfile] = useState(false);

  if (checkingAuth || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <>
      <MotionPaper
        elevation={0}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          p: { xs: 2, sm: 3 },
          borderRadius: 4,
          color: "white",
          border: "1px solid #2a2a2a",
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 3, md: 0 }}
          sx={{
            alignItems: { xs: "center", md: "center" },
            justifyContent: "space-between",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2.5}
            sx={{
              alignItems: { xs: "center", sm: "center", md: "left" },
              flex: 1,
              textAlign: { xs: "center", sm: "left", md: "left" },
            }}
          >
            <Avatar
              src={user.avatar_url}
              alt={user.name}
              sx={{
                bgcolor: "orange",
                width: { xs: 90, sm: 100 },
                height: { xs: 90, sm: 100 },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "55px",
                  mt: 0.9,
                }}
              >
                {!user.avatar_url && user.name?.charAt(0)?.toUpperCase()}
              </Typography>
            </Avatar>

            <Box>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                  fontSize: {
                    xs: "20px",
                    sm: "24px",
                  },
                }}
              >
                {user.name}
              </Typography>

              <Typography sx={{ opacity: 0.6 }}>{user.email}</Typography>
            </Box>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{
              width: {
                xs: "100%",
                md: "auto",
              },
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => setShowEditProfile(true)}
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
              onClick={() => dispatch(logout())}
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

        <Divider
          sx={{
            my: 3,
            borderColor: "#2a2a2a",
          }}
        />
      </MotionPaper>

      <EditProfileDialog
        open={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
    </>
  );
}
