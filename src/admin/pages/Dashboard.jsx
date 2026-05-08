import React, { useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Link,
  useTheme,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import {
  TrendingUp as ArrowUpRight,
  AttachMoney as DollarSign,
  ShoppingBag,
  People as UsersIcon,
  Inventory as Package,
} from "@mui/icons-material";
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

import { useProducts } from "../../hooks/useProducts";
import { useOrders } from "../../hooks/useOrders";
import { useUsers } from "../../hooks/useUsers";

function Dashboard() {
  const theme = useTheme();

  const { products, loading } = useProducts();
  const { orders } = useOrders();
  const { users } = useUsers();

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => {
      const value = parseFloat(o.total);
      return sum + (isNaN(value) ? 0 : value);
    }, 0);
  }, [orders]);

  const salesData = useMemo(() => {
    const data = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString("en", { month: "short" }),
      revenue: 0,
    }));

    orders.forEach((order) => {
      const date = order.date || order.created_at;
      if (!date) return;

      const monthIndex = new Date(date).getMonth();
      const value = parseFloat(order.total);

      data[monthIndex].revenue += isNaN(value) ? 0 : value;
    });

    return data;
  }, [orders]);

  const topProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => Number(b.sold || 0) - Number(a.sold || 0))
      .slice(0, 4);
  }, [products]);

  const kpis = useMemo(
    () => [
      {
        label: "Revenu total",
        value: `${totalRevenue.toLocaleString()} MAD`,
        icon: DollarSign,
      },
      {
        label: "Total des commandes",
        value: orders.length,
        icon: ShoppingBag,
      },
      {
        label: "Utilisateurs totaux",
        value: users.length,
        icon: UsersIcon,
      },
      {
        label: "Produits totaux",
        value: products.length,
        icon: Package,
      },
    ],
    [totalRevenue, orders.length, users.length, products.length],
  );

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === "pending") return "warning";
    if (s === "confirmed") return "info";
    if (s === "delivered") return "success";
    return "default";
  };

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
        <Grid container spacing={3} sx={{ mb: 3 }}>
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
                          `${value.toLocaleString()} MAD`
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
                          `${value.toLocaleString()} MAD`,
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

          <Grid size={{ xs: 12, lg: 4 }}>
            <Card
              sx={{
                border: 1,
                borderColor: "divider",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
              }}
            >
              <CardHeader
                title="Meilleurs produits vendus"
                titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
              />
              <CardContent sx={{ pt: 0 }}>
                {topProducts.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      p: 1.5,
                      mb: 1.5,
                      borderRadius: 2,
                      border: 1,
                      borderColor: "divider",
                      "&:last-child": { mb: 0 },
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="h6">{product.category}</Typography>
                    </Box>
                    <Typography variant="h6">{product.sold}</Typography>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Recent Orders */}
        <Card
          sx={{
            border: 1,
            borderColor: "divider",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <CardHeader
            title="Commandes récentes"
            titleTypographyProps={{ variant: "h6", fontWeight: 600 }}
            action={
              <Link
                href="/orders"
                underline="hover"
                sx={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                Voir tout
              </Link>
            }
          />

          <CardContent>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Commande</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Statut</TableCell>
                    <TableCell sx={{ fontWeight: 600, textAlign: "right" }}>
                      Total
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orders.slice(0, 6).map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        <Typography>{order.user?.name || "Inconnu"}</Typography>
                        <Typography variant="caption">
                          {order.user?.email || "-"}
                        </Typography>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <Chip
                          label={order.status}
                          size="small"
                          color={getStatusColor(order.status)}
                        />
                      </TableCell>
                      <TableCell sx={{ textAlign: "right", fontWeight: 600 }}>
                        {order.total} MAD
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}

export default Dashboard;
