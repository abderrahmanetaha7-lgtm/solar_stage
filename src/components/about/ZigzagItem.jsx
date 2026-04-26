import { Box, Typography } from "@mui/material";
import useReveal from "../../hooks/useReveal";

export default function ZigzagItem({ item, reverse, isDark }) {
  const [ref, visible] = useReveal();

  return (
    <>
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
            mt: 6,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(40px)",
            transition: "0.6s ease",
          }}
        >
          <Box
            component="img"
            src={item.img}
            alt=""
            sx={{
              width: { xs: "100%", md: "45%" },
              borderRadius: 3,
            }}
          />
    
          <Box sx={{ width: { xs: "100%", md: "55%" } }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "30px",
                mb: 1,
                color:"primary.main",
              }}
            >
              {item.title}
            </Typography>
    
            <Typography sx={{ color: isDark ? "#94a3b8" : "black" }}>
              {item.text}
            </Typography>
          </Box>
        </Box>
    </>
  );
}