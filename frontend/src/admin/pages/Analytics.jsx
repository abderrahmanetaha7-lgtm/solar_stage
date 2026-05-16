import React from "react";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";

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

import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";

import { useAnalytics } from "../../hooks/useAnalytics";

/* ================= FORMAT PRICE ================= */

function formatPrice(price) {
  const number = Number(price || 0);

  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  }

  if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }

  return number.toString();
}

export default function AnalyticsPage() {
  const theme = useTheme();

  const COLORS = [
    "#f97316",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#ef4444",
    "#14b8a6",
    "#eab308",
  ];

  const {
    salesData = [],
    categoryData = [],
    stats = {},
    loading,
  } = useAnalytics();

    if (loading) {
    return (
      <Loading/>
    );
  }

  return (
    <>
      <PageHeader
        title="Analytique"
        description="Aperçu des performances de votre boutique."
      />

      {/* ================= KPI CARDS ================= */}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* REVENUE */}

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Revenus
                </Typography>

                <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                  {formatPrice(stats.totalRevenue)} MAD
                </Typography>
              </Box>

              <AttachMoneyOutlinedIcon
                sx={{
                  fontSize: 34,
                  color: "success.main",
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* ORDERS */}

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Commandes
                </Typography>

                <Typography variant="h4" fontWeight={700} sx={{ mt: 1 }}>
                  {stats.totalOrders || 0}
                </Typography>
              </Box>

              <ShoppingBagOutlinedIcon
                sx={{
                  fontSize: 34,
                  color: "primary.main",
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* DELIVERED */}

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Livrées
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ mt: 1 }}
                  color="success.main"
                >
                  {stats.deliveredOrders || 0}
                </Typography>
              </Box>

              <LocalShippingOutlinedIcon
                sx={{
                  fontSize: 34,
                  color: "success.main",
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* PENDING */}

        <Grid size={{ xs: 12, md: 6, lg: 3 }}>
          <Card
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              boxShadow: "none",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  En attente
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ mt: 1 }}
                  color="warning.main"
                >
                  {stats.pendingOrders || 0}
                </Typography>
              </Box>

              <WarningAmberOutlinedIcon
                sx={{
                  fontSize: 34,
                  color: "warning.main",
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= CHARTS ================= */}

      <Grid container spacing={3}>
        {/* REVENUE CHART */}

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Revenus dans le temps
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                pt: 0,
                height: 300,
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={salesData || []}
                  margin={{
                    left: -10,
                    right: 10,
                  }}
                >
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
                    tickFormatter={(value) => `${formatPrice(value)}`}
                  />

                  <Tooltip
                    formatter={(value) => [`${formatPrice(value)} MAD`]}
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

        {/* ORDERS CHART */}

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Commandes dans le temps
              </Typography>
            </Box>

            <Box
              sx={{
                p: 2,
                pt: 0,
                height: 300,
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData}
                  margin={{
                    left: -10,
                    right: 10,
                  }}
                >
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

        {/* CATEGORY CHART */}

        <Grid size={{ xs: 12 }}>
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Box sx={{ p: 2, pb: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Ventes par catégorie
              </Typography>
            </Box>

            <Box sx={{ p: 2, pt: 0 }}>
              <Grid
                container
                spacing={3}
                sx={{
                  alignItems: "center",
                }}
              >
                {/* PIE */}

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

                {/* CATEGORY LIST */}

                <Grid size={{ xs: 12, md: 6 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    {(categoryData || []).map((c, i) => (
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
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              width: 12,
                              height: 12,
                              borderRadius: "50%",
                              bgcolor: COLORS[i],
                            }}
                          />

                          <Typography variant="body2" fontWeight={500}>
                            {c.name}
                          </Typography>
                        </Box>

                        <Typography variant="body2" fontWeight={700}>
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
