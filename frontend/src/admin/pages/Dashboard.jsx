import React from "react";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Chip,
  Avatar,
  Stack,
  useTheme,
} from "@mui/material";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import PeopleIcon from "@mui/icons-material/People";
import InventoryIcon from "@mui/icons-material/Inventory";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import PageHeader from "../components/PageHeader";
import Loading from "../components/Loading";

import { useAnalytics } from "../../hooks/useAnalytics";
function Dashboard() {
  const {
    salesData = [],
    stats = {},
    topProducts = [],
    loading: analyticsLoading,
  } = useAnalytics();

  const formatCompactNumber = (value = 0) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }

    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }

    return Number(value).toLocaleString();
  };
  const theme = useTheme();

  const loading = analyticsLoading;

const kpis = [
  {
    label: "Revenu total",
    value: `${formatCompactNumber(stats.totalRevenue || 0)} MAD`,
    icon: AttachMoneyIcon,
  },
  {
    label: "Total des commandes",
    value: formatCompactNumber(stats.totalOrders || 0),
    icon: ShoppingBagIcon,
  },
  {
    label: "Utilisateurs totaux",
    value: formatCompactNumber(stats.totalUsers || 0),
    icon: PeopleIcon,
  },
  {
    label: "Produits totaux",
    value: formatCompactNumber(stats.totalProducts || 0),
    icon: InventoryIcon,
  },
];

  if (loading) {
    return (
      <Loading/>
    );
  }

  console.log(salesData);
 

  return (
    <>
      <PageHeader
        title="Tableau de bord"
        description="Bienvenue. Voici un aperçu de ce qui se passe aujourd’hui."
      />

      <Box sx={{ width: "100%" }}>
        {/* KPI Cards */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {kpis.map((k) => (
            <Grid size={{ xs: 12, md: 6 }} key={k.label}>
              <Card
                sx={{
                  border: 1,
                  borderColor: "divider",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {k.label}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          mt: 1,
                          fontWeight: 600,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {k.value}
                      </Typography>
                    </Box>
                    <Box>
                      <k.icon sx={{ fontSize: 20 }} />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Charts and Top Products */}

        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            sx={{
              border: 1,
              borderColor: "divider",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          >
            <CardHeader
              title="Aperçu des ventes"
              titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
            />
            <CardContent>
              <Box sx={{ height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ left: -10, right: 10, top: 10 }}
                  >
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={theme.palette.primary.main}
                          stopOpacity={0.45}
                        />
                        <stop
                          offset="100%"
                          stopColor={theme.palette.primary.main}
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>

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
                      tickFormatter={(value) =>
                        `${formatCompactNumber(value)} MAD`
                      }
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: `1px solid ${theme.palette.divider}`,
                        backgroundColor: theme.palette.background.paper,
                        fontSize: 12,
                      }}
                      formatter={(value) => [
                        `${formatCompactNumber(value)} MAD`,
                        "Revenu",
                      ]}
                    />

                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2.5}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* TOP PRODUCTS */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            sx={{
              border: 1,
              borderColor: "divider",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
              height: "100%",
            }}
          >
            <CardHeader
              title="Meilleurs produits vendus"
              titleTypographyProps={{
                variant: "h6",
                fontWeight: 700,
              }}
            />

            <CardContent sx={{ pt: 0 }}>
              <Stack spacing={2}>
                {topProducts.map((product) => (
                  
                  <Box
                    key={product.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 2,
                      p: 2,
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                    }}
                  >
                    {/* LEFT */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      {/* IMAGE */}
                      <Avatar
                        src={
                          product.images?.[0]?.image
                            ? `${import.meta.env.VITE_API_URL}/storage/${product.images[0].image}`
                            : ""
                        }
                        variant="rounded"
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 3,
                        }}
                      />

                      {/* INFO */}
                      <Box
                        sx={{
                          minWidth: 0,
                          flex: 1,
                        }}
                      >
                        <Typography fontWeight={700} noWrap>
                          {product.name_fr}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                          noWrap
                        >
                          {product.category?.name_fr || "Accessoire"}
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          <Chip
                            size="small"
                            label={`${product.stock_quantity} stock`}
                            color={
                              product.stock_quantity <= 0 ? "error" : "success"
                            }
                          />

                          <Chip
                            size="small"
                            label={`${Number(
                              product.price,
                            ).toLocaleString()} MAD`}
                          />
                        </Stack>
                      </Box>
                    </Box>

                    {/* RIGHT */}
                    <Box
                      sx={{
                        textAlign: "right",
                        minWidth: 90,
                      }}
                    >
                      <Typography
                        variant="h5"
                        fontWeight={800}
                        color="primary.main"
                      >
                        {formatCompactNumber(product.delivered_quantity || 0)}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        ventes
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Box>
    </>
  );
}

export default Dashboard;
