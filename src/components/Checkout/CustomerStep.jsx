import { Grid, TextField } from "@mui/material";

export default function CustomerStep({
  customerInfo,
  errors,
  handleCustomerChange,
  t,
}) {
  return (
    <Grid container spacing={2}>
      <Grid xs={6}>
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

      <Grid xs={6}>
        <TextField
          fullWidth
          name="lastName"
          label={t("checkout.fields.lastName")}
          value={customerInfo.lastName}
          onChange={handleCustomerChange}
        />
      </Grid>

      <Grid xs={12}>
        <TextField
          fullWidth
          name="email"
          label={t("checkout.fields.email")}
          value={customerInfo.email}
          onChange={handleCustomerChange}
        />
      </Grid>
    </Grid>
  );
}