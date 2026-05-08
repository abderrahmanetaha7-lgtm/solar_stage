import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CircularProgress from "@mui/material/CircularProgress";

import { Box, Card, Grid, Typography, useTheme } from "@mui/material";
import PageHeader from "../components/PageHeader";
import { useAnalytics } from "../../hooks/useAnalytics";

export default function AnalyticsPage() {
  const COLORS = ["#f97316", "#10b981", "#3b82f6"];

  const theme = useTheme();
  const { salesData = [], categoryData = [], loading } = useAnalytics();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50vh",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Chargement...</Typography>
      </Box>
    );
  }

  return (
    <>
      <PageHeader
        title="Analytique"
        description="Aperçu des performances de votre boutique."
      />

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        {/* Revenue Line Chart */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Revenus dans le temps
              </Typography>
            </Box>
            <Box sx={{ p: 2, pt: 0, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ left: -10, right: 10 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme.palette.divider}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${theme.palette.divider}`,
                      fontSize: 12,
                      backgroundColor: theme.palette.background.paper,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke={COLORS[0]}
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Orders Bar Chart */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Commandes dans le temps
              </Typography>
            </Box>
            <Box sx={{ p: 2, pt: 0, height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ left: -10, right: 10 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={theme.palette.divider}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke={theme.palette.text.secondary}
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${theme.palette.divider}`,
                      fontSize: 12,
                      backgroundColor: theme.palette.background.paper,
                    }}
                  />
                  <Bar
                    dataKey="orders"
                    fill={COLORS[0]}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Card>
        </Grid>

        {/* Sales by Category */}
        <Grid size={{ xs: 12 }}>
          <Card sx={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Ventes par catégorie
              </Typography>
            </Box>
            <Box sx={{ p: 2, pt: 0 }}>
              <Grid container spacing={3} sx={{ alignItems: "center" }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={3}
                        >
                          {categoryData.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            borderRadius: 12,
                            border: `1px solid ${theme.palette.divider}`,
                            fontSize: 12,
                            backgroundColor: theme.palette.background.paper,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {categoryData.map((c, i) => (
                      <Box
                        key={c.name}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          borderRadius: 2,
                          border: `1px solid ${theme.palette.divider}`,
                          p: 2,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              bgcolor: COLORS[i],
                            }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {c.name}
                          </Typography>
                        </Box>

                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {c.value}%
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
