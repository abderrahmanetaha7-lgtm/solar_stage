import { Box, Typography } from "@mui/material";

export default function HeroSection({ isDark, heroImg }) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          mb: 5,
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "28px", md: "40px" },
            fontWeight: 600,
            letterSpacing: "-0.5px",
            color: isDark ? "#fff" : "#111",
          }}
        >
          About Sunergy
        </Typography>
        <Typography
          sx={{
            maxWidth: "500px",
            color: isDark ? "#94a3b8" : "#6b7280",
            lineHeight: 1.6,
          }}
        >
          We're on a mission to accelerate the world's transition to sustainable
          energy.
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          minHeight: "270px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to left, rgba(0,0,0,0.7), rgba(0, 0, 0, 0.34))",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            maxWidth: "900px",
            px: 3,
            textAlign: { xs: "center", md: "center" },
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            mb={3}
            sx={{ fontSize: { xs: "30px", sm: "40px", md: "50px" } }}
          >
            Clean Energy for a Better Future
          </Typography>

          <Typography sx={{ color: "#e2e8f0", fontSize: "1.3rem" }}>
            We are a company specialized in solar energy solutions, committed to
            delivering clean, sustainable, and cost-effective power for homes
            and businesses.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
