import { Box, Skeleton } from "@mui/material";

export default function AppSkeleton() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#081220",
        overflow: "hidden",
      }}
    >
      {/* ================= NAVBAR ================= */}

      <Box
        sx={{
          height: 82,
          px: {
            xs: 2,
            md: 4,
          },

          display: "flex",
          alignItems: "center",

          borderBottom: "1px solid rgba(255,255,255,0.04)",

          backdropFilter: "blur(10px)",

          bgcolor: "#162232",
        }}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height={46}
          sx={{
            borderRadius: 4,

            bgcolor: "rgba(255,255,255,0.07)",

            "&::after": {
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            },
          }}
        />
      </Box>

      {/* ================= HERO ================= */}

      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 82px)",

          p: {
            xs: 2,
            md: 4,
          },
        }}
      >
        <Skeleton
          variant="rounded"
          animation="wave"
          width="100%"
          height="100%"
          sx={{
            borderRadius: {
              xs: 0,
              md: 6,
            },

            bgcolor: "rgba(255,255,255,0.06)",

            "&::after": {
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
            },
          }}
        />
      </Box>
    </Box>
  );
}
