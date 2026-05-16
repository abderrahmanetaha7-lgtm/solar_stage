// AdminProfile.jsx

import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  PhotoCamera,
  Delete,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";

import {
  updateProfileAction,
  deleteProfileAction,
} from "../../features/profile/profileSlice";

export default function AdminProfile() {
  const dispatch = useDispatch();

  const admin = useSelector((state) => state.auth.user);

  const { loading, success, errors, deleteSuccess } = useSelector(
    (state) => state.profile,
  );

  const [showPassword, setShowPassword] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [form, setForm] = useState({
    name: admin?.name || "",
    email: admin?.email || "", 
    current_password: "",
    new_password: "",
    avatar: null,
  });

  /* ================= REDIRECT AFTER DELETE ================= */

  useEffect(() => {
    if (deleteSuccess) {
      window.location.href = "/login";
    }
  }, [deleteSuccess]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE AVATAR ================= */

  const handleAvatar = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setForm((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("_method", "PUT");

    formData.append("name", form.name);

    formData.append("email", form.email); 

    if (form.current_password) {
      formData.append("current_password", form.current_password);
    }

    if (form.new_password) {
      formData.append("new_password", form.new_password);
    }

    if (form.avatar) {
      formData.append("avatar", form.avatar);
    }

    dispatch(updateProfileAction(formData));
  };

  /* ================= DELETE ACCOUNT ================= */

  const handleDeleteAccount = () => {
    dispatch(deleteProfileAction());
  };

  return (
    <>
      <Box>
        {/* HEADER */}

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        >
          Profil Administrateur
        </Typography>

        <Grid container spacing={4}>
          {/* LEFT */}

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                height: "100%",
              }}
            >
              {/* AVATAR */}

              <Box
                sx={{
                  position: "relative",
                  width: 150,
                  height: 150,
                  mx: "auto",
                }}
              >
                <Avatar
                  src={
                    form.avatar
                      ? URL.createObjectURL(form.avatar)
                      : admin?.avatar_url
                  }
                  sx={{
                    width: 150,
                    height: 150,
                    fontSize: 60,
                    mx: "auto",
                  }}
                >
                  {admin?.name?.charAt(0)?.toUpperCase()}
                </Avatar>

                {/* UPLOAD */}

                <IconButton
                  component="label"
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "primary.main",
                    color: "#fff",

                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  }}
                >
                  <PhotoCamera />

                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleAvatar}
                  />
                </IconButton>
              </Box>

              {/* INFO */}

              <Typography variant="h6" fontWeight={700} sx={{ mt: 3 }}>
                {form.name}
              </Typography>

              <Typography color="text.secondary">{form.email}</Typography>

              {/* DELETE */}

              <Button
                fullWidth
                color="error"
                variant="outlined"
                startIcon={<Delete />}
                sx={{ mt: 4 }}
                onClick={() => setOpenDelete(true)}
              >
                Supprimer le compte
              </Button>
            </Card>
          </Grid>

          {/* RIGHT */}

          <Grid size={{ xs: 12, md: 8 }}>
            <Card
              sx={{
                p: 4,
                borderRadius: 4,
              }}
            >
              <Grid container spacing={3}>
                {/* NAME */}

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Nom"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name?.[0]}
                  />
                </Grid> 

                {/* EMAIL */}

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email?.[0]}
                  />
                </Grid>

                {/* CURRENT PASSWORD */}

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Mot de passe actuel"
                    name="current_password"
                    type={showPassword ? "text" : "password"}
                    value={form.current_password}
                    onChange={handleChange}
                    error={!!errors.current_password}
                    helperText={errors.current_password?.[0]}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                {/* NEW PASSWORD */}

                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Nouveau mot de passe"
                    name="new_password"
                    type={showPassword ? "text" : "password"}
                    value={form.new_password}
                    onChange={handleChange}
                    error={!!errors.new_password}
                    helperText={errors.new_password?.[0]}
                  />
                </Grid>

                {/* SUCCESS */}

                {success && (
                  <Grid size={{ xs: 12 }}>
                    <Typography color="success.main">{success}</Typography>
                  </Grid>
                )}

                {/* BUTTON */}

                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="contained"
                    size="large"
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {loading ? (
                      <CircularProgress size={22} color="inherit" />
                    ) : (
                      "Sauvegarder les modifications"
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* DELETE DIALOG */}

      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle fontWeight={700}>Supprimer le compte</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
            irréversible.
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => setOpenDelete(false)}>
            Annuler
          </Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleDeleteAccount}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              "Supprimer"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
