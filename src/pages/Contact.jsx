import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Button,
  Divider,
  Link,
  Stack,
  Paper,
  Snackbar,
} from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  function handleSubmitted() {
    setSubmitted(true);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <>
      <Box sx={{ py: 8, mt: 0 }}>
        <Container maxWidth="lg">
          {/* ===== HEADER ===== */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              p: 5,
              mb: 3,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: { xs: "30px", sm: "40px", md: "50px" },
              }}
            >
              Get in Touch
            </Typography>
            <Typography
              sx={{ textAlign: "center", color: "text.secondary", mt: 2 }}
            >
              Have questions? We'd love to hear from you.{" "}
            </Typography>
          </Box>

          {/* ===== CONTENT ===== */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Grid container spacing={4}>
              {/* ===== RIGHT CARD (FORM) ===== */}
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent sx={{ p: 4 }}>
                    <Stack spacing={3}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Name"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Email"
                            type="email"
                          />
                        </Grid>
                      </Grid>

                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Phone"
                        sx={{ mt: 2 }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Subject"
                        sx={{ mt: 2 }}
                      />
                      <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Message"
                        multiline
                        rows={5}
                        sx={{ mt: 2 }}
                      />

                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        startIcon={<SendOutlinedIcon />}
                        sx={{ mt: 3, borderRadius: 2 }}
                        onClick={handleSubmitted}
                      >
                        Send Message
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
              {/* ===== LEFT CARD ===== */}
              <Grid item xs={12} md={6}>
                <Card sx={{ borderRadius: 3, background: "none" }}>
                  <CardContent sx={{ p: 2 }}>
                    {[
                      {
                        icon: <EmailOutlinedIcon />,
                        label: "Email",
                        value: "sunergy@gmail.com",
                      },
                      {
                        icon: <LocalPhoneOutlinedIcon />,
                        label: "Phone",
                        value: "+212 66666666",
                      },
                      {
                        icon: <LocationOnOutlinedIcon />,
                        label: "Address",
                        value: "Marrakech",
                      },
                    ].map((item, i) => (
                      <Grid item xs={12} key={i}>
                        <Paper
                          sx={{
                            p: 3,
                            display: "flex",
                            gap: 2,
                            borderRadius: 3,
                            height: "100%",
                            mb: 3,
                            width: "500px",
                          }}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: 2,
                              color: "primary.light",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            {item.icon}
                          </Box>

                          <Box>
                            <Typography fontWeight="medium">
                              {item.label}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.value}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <Paper
            sx={{
              height: { xs: 250, md: 350 },
              borderRadius: 3,
              overflow: "hidden",
              mt: 8,
            }}
          >
            <iframe
              title="map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps?q=Marrakech&output=embed"
            />
          </Paper>
        </Container>
      </Box>
      {submitted && (
        <Snackbar
          sx={{ bgcolor: "green", borderRadius: "15px", mt: 6 }}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          message="Message Sent!"
          key={{ vertical: "top", horizontal: "center" }}
        />
      )}
    </>
  );
}
