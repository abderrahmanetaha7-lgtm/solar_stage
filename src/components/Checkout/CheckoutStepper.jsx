import { Stepper, Step, StepLabel } from "@mui/material";

export default function CheckoutStepper({ steps, activeStep }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 2 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
