// SummaryCard.jsx

import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";

export default function SummaryCard({
  title,

  rows = [],

  totalLabel,
  totalValue,

  buttonText,
  onButtonClick,

  isLoading = false,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: {
          xs: 3,
          md: 4,
        },
        borderRadius: "24px",
        border: "1px solid",
        borderColor: "divider",
        position: "sticky",
        top: 100,
      }}
    >
      {/* TITLE */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 800,
          textAlign: "center",
          mb: 3,
        }}
      >
        {title}
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {/* ROWS */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {rows.map((row) => (
          <Box
            key={row.label}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography color="text.secondary">{row.label}</Typography>

            <Typography fontWeight={700} color={row.color || "text.primary"}>
              {row.value}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* TOTAL */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" fontWeight={800}>
          {totalLabel}
        </Typography>

        <Typography variant="h6" fontWeight={900} color="primary.main">
          {totalValue}
        </Typography>
      </Box>

      {/* BUTTON */}
      {buttonText && (
        <Button
          fullWidth
          variant="contained"
          onClick={onButtonClick}
          disabled={isLoading}
          sx={{
            mt: 4,
            py: 1.8,
            borderRadius: "18px",
            fontWeight: 700,
            fontSize: "1rem",
            textTransform: "none",
          }}
        >
          {isLoading ? (
            <CircularProgress
              size={24}
              sx={{
                color: "white",
              }}
            />
          ) : (
            buttonText
          )}
        </Button>
      )}
    </Paper>
  );
}
