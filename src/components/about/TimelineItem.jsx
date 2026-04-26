import React from "react";
import { Box, Typography } from "@mui/material";
import useReveal from "../../hooks/useReveal";

export default function TimelineItem({ item, index }) {
  const [ref, visible] = useReveal();
  const isLeft = index % 2 === 0;

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        mb: 8,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "0.6s ease",
      }}
    >
      {/* Content */}
      <Box
        sx={{
          width: { xs: "40%", md: "40%" },
          textAlign: {
            xs: isLeft ? "right" : "left",
            md: isLeft ? "right" : "left",
          },
        }}
      >
        <Typography sx={{fontWeight:"bold", fontSize:"20px"}}>
          {item.year}
        </Typography>

        <Typography sx={{ opacity: 0.7 }}>{item.description}</Typography>
      </Box>

      {/* Circle in center */}
      <Box
        sx={{
          position: "absolute",
          left: "50%",
          top: 0,
          transform: "translateX(-50%)",
          width: 20,
          height: 20,
          borderRadius: "50%",
          border: "3px solid white",
          backgroundColor: "primary.main",
          zIndex: 2,
        }}
      />
    </Box>
  );
}
