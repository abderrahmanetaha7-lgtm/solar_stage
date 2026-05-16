import {
  Grid,
  TextField,
  Paper,
  Typography,
  Box,
} from "@mui/material";

export default function CustomerStep({
  customerInfo,
  errors,
  handleCustomerChange,
  t,
}) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          fontWeight={700}
          mb={1}
        >
          {t("checkout.customerInfo")}
        </Typography>

        <Typography color="text.secondary">
          {t("checkout.customerInfoDesc")}
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {/* FIRST NAME */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            name="firstName"
            label={t("checkout.fields.firstName")}
            value={customerInfo.firstName}
            onChange={handleCustomerChange}
            error={!!errors.firstName}
            helperText={errors.firstName}
          />
        </Grid>

        {/* LAST NAME */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            name="lastName"
            label={t("checkout.fields.lastName")}
            value={customerInfo.lastName}
            onChange={handleCustomerChange}
            error={!!errors.lastName}
            helperText={errors.lastName}
          />
        </Grid>

        {/* EMAIL */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            type="email"
            name="email"
            label={t("checkout.fields.email")}
            value={customerInfo.email}
            onChange={handleCustomerChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>

        {/* PHONE */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="phone"
            label={t("checkout.fields.phone")}
            value={customerInfo.phone}
            onChange={handleCustomerChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
        </Grid>

        {/* ADDRESS */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            minRows={3}
            name="address"
            label={t("checkout.fields.address")}
            value={customerInfo.address}
            onChange={handleCustomerChange}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Grid>

        {/* CITY */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            name="city"
            label={t("checkout.fields.city")}
            value={customerInfo.city}
            onChange={handleCustomerChange}
            error={!!errors.city}
            helperText={errors.city}
          />
        </Grid>

        {/* POSTAL CODE */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            name="postalCode"
            label={t("checkout.fields.postalCode")}
            value={customerInfo.postalCode}
            onChange={handleCustomerChange}
            error={!!errors.postalCode}
            helperText={errors.postalCode}
          />
        </Grid>

        {/* COUNTRY */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            name="country"
            label={t("checkout.fields.country")}
            value={customerInfo.country}
            onChange={handleCustomerChange}
            error={!!errors.country}
            helperText={errors.country}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}