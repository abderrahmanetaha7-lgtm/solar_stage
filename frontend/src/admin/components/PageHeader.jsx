import React from "react";
import { Box, Typography } from "@mui/material";

const PageHeader = ({ title, description, actions }) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        gap: { xs: 2, sm: 3 },
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            letterSpacing: "-0.02em",
            fontSize: { xs: "1.5rem", sm: "1.875rem" },
          }}
        >
          {title}
        </Typography>
        {description && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5, fontSize: "0.875rem" }}
          >
            {description}
          </Typography>
        )}
      </Box>
      {actions && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {actions}
        </Box>
      )}
    </Box>
  );
};

export default PageHeader;