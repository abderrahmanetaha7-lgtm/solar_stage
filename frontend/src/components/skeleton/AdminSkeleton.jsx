import { Box, Grid, Skeleton, Stack, Divider } from "@mui/material";

export default function AdminSkeleton() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#071426",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* ================= SIDEBAR ================= */}

      <Box
        sx={{
          width: 300,
          bgcolor: "#2d2d2d",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          display: {
            xs: "none",
            md: "flex",
          },
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Skeleton
            variant="rounded"
            width={50}
            height={50}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />

          <Skeleton
            variant="text"
            width={140}
            height={40}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

        {/* Menu */}
        <Stack spacing={2} sx={{ p: 2 }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Box
              key={item}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Skeleton
                variant="rounded"
                width={50}
                height={50}
                sx={{
                  borderRadius: 3,
                  bgcolor:
                    item === 1
                      ? "rgba(255,193,7,0.25)"
                      : "rgba(255,255,255,0.06)",
                }}
              />

              <Skeleton
                variant="text"
                width="70%"
                height={35}
                sx={{
                  bgcolor: "rgba(255,255,255,0.06)",
                }}
              />
            </Box>
          ))}
        </Stack>
      </Box>

      {/* ================= MAIN CONTENT ================= */}

      <Box
        sx={{
          flex: 1,
          p: {
            xs: 2,
            md: 3,
          },
        }}
      >
        {/* ================= TOPBAR ================= */}

        <Box
          sx={{
            height: 90,
            px: 3,
            mb: 4,
            borderRadius: 4,
            bgcolor: "#162232",

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton
              variant="circular"
              width={42}
              height={42}
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
              }}
            />

            <Skeleton
              variant="text"
              width={220}
              height={45}
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2} alignItems="center">
            <Skeleton
              variant="circular"
              width={45}
              height={45}
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
              }}
            />

            <Skeleton
              variant="rounded"
              width={120}
              height={50}
              sx={{
                borderRadius: 10,
                bgcolor: "rgba(255,255,255,0.08)",
              }}
            />
          </Stack>
        </Box>

        {/* ================= PAGE TITLE ================= */}

        <Box sx={{ mb: 4 }}>
          <Skeleton
            variant="text"
            width={320}
            height={60}
            sx={{
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />

          <Skeleton
            variant="text"
            width={420}
            height={30}
            sx={{
              bgcolor: "rgba(255,255,255,0.06)",
            }}
          />
        </Box>

        {/* ================= STATS CARDS ================= */}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[1, 2, 3, 4].map((item) => (
            <Grid item xs={12} md={6} key={item}>
              <Box
                sx={{
                  p: 3,
                  height: 150,
                  borderRadius: 4,
                  bgcolor: "#162232",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mb: 3 }}
                >
                  <Skeleton
                    variant="text"
                    width={140}
                    height={35}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.08)",
                    }}
                  />

                  <Skeleton
                    variant="circular"
                    width={30}
                    height={30}
                    sx={{
                      bgcolor: "rgba(255,255,255,0.08)",
                    }}
                  />
                </Stack>

                <Skeleton
                  variant="text"
                  width={180}
                  height={70}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.08)",
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* ================= CHART ================= */}

        <Box
          sx={{
            p: 3,
            borderRadius: 4,
            bgcolor: "#162232",
          }}
        >
          <Skeleton
            variant="text"
            width={300}
            height={50}
            sx={{
              mb: 4,
              bgcolor: "rgba(255,255,255,0.08)",
            }}
          />

          <Skeleton
            variant="rounded"
            width="100%"
            height={350}
            animation="wave"
            sx={{
              borderRadius: 4,
              bgcolor: "rgba(255,255,255,0.05)",

              "&::after": {
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
