import { Box, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { useState } from "react";
import TeamCard from "./TeamCard";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function TeamSection({ team }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % team.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + team.length) % team.length);
  };

  return (
    <>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "30px",
          fontWeight: 600,
          mt: 10,
          mb: 5,
        }}
      >
        Notre équipe
      </Typography>

      {/* MOBILE VIEW */}
      {isMobile ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {/* LEFT ARROW */}
          <IconButton onClick={handlePrev}>
            <ArrowBackIosNewIcon />
          </IconButton>

          {/* CARD */}
          <TeamCard member={team[index]} />
          <IconButton onClick={handleNext}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      ) : (
        
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {team.map((m) => (
            <TeamCard key={m.id} member={m} />
          ))}
        </Box>
      )}
    </>
  );
}