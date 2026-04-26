import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function GoContactHome() {
  return (
    // Outer container for centering the content
    <Box
      sx={{
        px: 3, // Horizontal padding
        py: 8, // Vertical padding
        display: "flex",
        justifyContent: "center", // Center the inner box horizontally
      }}
    >
      {/* Main call-to-action card */}
      <Box
        sx={{
          width: "100%",
          maxWidth: "1100px", // Maximum width of the card
          textAlign: "center", // Center align all text
          borderRadius: "20px", // Rounded corners
          px: { xs: 3, md: 6 }, // Responsive horizontal padding
          py: { xs: 6, md: 8 }, // Responsive vertical padding
          backgroundColor: "background.paper", // Theme-aware background color
          color: "text.primary", // Theme-aware text color
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 4px 20px rgba(0,0,0,0.6)" // Dark mode shadow
              : "0 4px 20px rgba(0,0,0,0.08)", // Light mode shadow
          border: "1px solid",
          borderColor: "divider", // Theme-aware border color
        }}
      >
        {/* Main heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700, // Bold text
            mb: 2, // Bottom margin
            fontSize: { xs: "1.8rem", md: "2.2rem" }, // Responsive font size
          }}
        >
          Ready to Go Solar?
        </Typography>

        {/* Description text */}
        <Typography
          sx={{
            maxWidth: 550, // Limit text width for readability
            mx: "auto", // Center horizontally
            mb: 5, // Bottom margin
            color: "text.secondary", // Theme-aware secondary text color
            lineHeight: 1.6, // Improve readability
          }}
        >
          Get a free consultation and discover how much you can save with solar
          energy.
        </Typography>

        {/* Call-to-action button */}
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />} // Icon at the end of button
          sx={{
            px: 4, // Horizontal padding
            py: 1.3, // Vertical padding
            borderRadius: "999px", // Fully rounded (pill shape)
            textTransform: "none", // Prevent uppercase transformation
            fontWeight: 600, // Semi-bold text
            backgroundColor: "primary.main", // Theme primary color
            transition: "0.3s", // Smooth transition for hover effects
            "&:hover": {
              backgroundColor: "primary.dark", // Darker shade on hover
              transform: "translateY(-2px)", // Slight lift effect on hover
            },
          }}
        >
          Get Free Quote
        </Button>
      </Box>
    </Box>
  );
}