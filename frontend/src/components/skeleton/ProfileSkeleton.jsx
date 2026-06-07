import { Paper, Skeleton, Stack } from "@mui/material";

export default function ProfileSkeleton() {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 4,
        border: "1px solid #2a2a2a",
      }}
    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} alignItems="center">
        <Skeleton variant="circular" width={100} height={100} animation="wave" />
        <Stack spacing={1} sx={{ width: "100%", maxWidth: 280 }}>
          <Skeleton variant="text" width="70%" height={32} animation="wave" />
          <Skeleton variant="text" width="90%" height={24} animation="wave" />
        </Stack>
      </Stack>
    </Paper>
  );
}
