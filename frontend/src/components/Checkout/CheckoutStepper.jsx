import { Stepper, Step, StepLabel } from "@mui/material";

export default function CheckoutStepper({ steps, activeStep, setActiveStep }) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 2 }}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            onClick={() => {
              if (index < activeStep) {
                setActiveStep(index);
              }
            }}
            sx={{
              cursor: "pointer",
            }}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}
