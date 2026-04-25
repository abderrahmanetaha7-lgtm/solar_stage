import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  useTheme,
} from "@mui/material";

// Images (replace with your paths)
import sol1 from "../assets/images/sol1.webp";
import sol2 from "../assets/images/sol2.webp";
import sol3 from "../assets/images/sol3.webp";

import team1 from "../assets/images/team1.webp";
import team2 from "../assets/images/team2.jpg";
import team3 from "../assets/images/team3.webp";
import team4 from "../assets/images/team4.jpg";

export default function About() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const sections = [
    {
      title: "Our Mission",
      text: "Make clean solar energy accessible and affordable.",
      img: sol1,
    },
    {
      title: "Our Vision",
      text: "A world powered entirely by renewable energy.",
      img: sol2,
    },
    {
      title: "Our Values",
      text: "Innovation and sustainability drive everything we do.",
      img: sol3,
    },
  ];

  const team = [
    { name: "Elena Rodriguez", role: "CEO", img: team1 },
    { name: "James Chen", role: "CTO", img: team2 },
    { name: "Sarah Kim", role: "Design Lead", img: team3 },
    { name: "Michael Obi", role: "Operations", img: team4 },
  ];

  const timeline = [
    { year: "2018", text: "Company founded" },
    { year: "2020", text: "1000 installations" },
    { year: "2022", text: "Battery launch" },
    { year: "2024", text: "Expansion" },
  ];

  // Scroll animation hook (very lightweight)
  const useReveal = () => {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setVisible(true);
        },
        { threshold: 0.2 }
      );

      if (ref.current) observer.observe(ref.current);

      return () => observer.disconnect();
    }, []);

    return [ref, visible];
  };

  return (
    <Box sx={{ py: 10, background: isDark ? "#020617" : "#f8fafc" }}>
      <Container maxWidth="lg">
        {/* HEADER (Centered Perfectly) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mb: 10,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "28px", md: "36px" },
              fontWeight: 600,
              letterSpacing: "-0.5px",
              color: isDark ? "#fff" : "#111",
              mb: 1,
            }}
          >
            About SolarNova
          </Typography>

          <Typography
            sx={{
              maxWidth: "500px",
              color: isDark ? "#94a3b8" : "#6b7280",
              lineHeight: 1.6,
            }}
          >
            We're on a mission to accelerate the world's transition to sustainable energy.
          </Typography>
        </Box>

        {/* Zigzag Sections */}
        {sections.map((item, i) => (
          <ZigzagItem
            key={i}
            item={item}
            reverse={i % 2 !== 0}
            isDark={isDark}
            useReveal={useReveal}
          />
        ))}

        {/* TEAM TITLE */}
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "-0.3px",
            mt: 10,
            mb: 5,
            color: isDark ? "#fff" : "#111",
          }}
        >
          Our Team
        </Typography>

        {/* Team Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
          }}
        >
          {team.map((member, i) => (
            <Box key={i} textAlign="center">
              <Avatar
                src={member.img}
                sx={{ width: 72, height: 72, mx: "auto", mb: 1 }}
              />
              <Typography fontSize="14px">{member.name}</Typography>
              <Typography
                fontSize="12px"
                sx={{ color: isDark ? "#94a3b8" : "#6b7280" }}
              >
                {member.role}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* JOURNEY TITLE */}
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "-0.3px",
            mt: 12,
            mb: 6,
            color: isDark ? "#fff" : "#111",
          }}
        >
          Our Journey
        </Typography>

        {/* Timeline Section */}
        <Box sx={{ maxWidth: "500px", mx: "auto" }}>
          {timeline.map((item, i) => (
            <RevealItem
              key={i}
              text={`${item.year} — ${item.text}`}
              useReveal={useReveal}
              isDark={isDark}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

// Zigzag Component
function ZigzagItem({ item, reverse, isDark, useReveal }) {
  const [ref, visible] = useReveal();

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: reverse ? "row-reverse" : "row",
        },
        alignItems: "center",
        gap: 4,
        mb: 8,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "0.6s ease",
      }}
    >
      <Box
        component="img"
        src={item.img}
        alt=""
        loading="lazy"
        sx={{
          width: { xs: "100%", md: "45%" },
          borderRadius: 3,
        }}
      />

      <Box sx={{ width: { xs: "100%", md: "55%" } }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: "20px",
            mb: 1,
            color: isDark ? "#fff" : "#111",
          }}
        >
          {item.title}
        </Typography>

        <Typography sx={{ color: isDark ? "#94a3b8" : "#6b7280" }}>
          {item.text}
        </Typography>
      </Box>
    </Box>
  );
}

// Reveal Timeline Item Component
function RevealItem({ text, useReveal, isDark }) {
  const [ref, visible] = useReveal();

  return (
    <Box
      ref={ref}
      sx={{
        mb: 3,
        textAlign: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "0.5s ease",
        borderBottom: "1px solid",
        borderColor: isDark ? "#1e293b" : "#e5e7eb",
        pb: 2,
      }}
    >
      <Typography sx={{ color: isDark ? "#cbd5f5" : "#333" }}>
        {text}
      </Typography>
    </Box>
  );
}