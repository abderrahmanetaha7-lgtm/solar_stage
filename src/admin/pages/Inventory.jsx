import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Box,
  Card,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import PageHeader from "../components/PageHeader";
import { useAdmin } from "../hooks/useAdmin";

/* ================= STATUS STYLE (BASED ON BACKEND) ================= */

function getStatusStyle(status) {
  const styles = {
    in: {
      bg: "rgba(76, 175, 80, 0.1)",
      border: "rgba(76, 175, 80, 0.2)",
      dot: "#4caf50",
      text: "#2e7d32",
      label: "En stock",
    },
    low: {
      bg: "rgba(255, 152, 0, 0.15)",
      border: "rgba(255, 152, 0, 0.3)",
      dot: "#ff9800",
      text: "#ed6c02",
      label: "Stock faible",
    },
    out: {
      bg: "rgba(211, 47, 47, 0.1)",
      border: "rgba(211, 47, 47, 0.2)",
      dot: "#d32f2f",
      text: "#d32f2f",
      label: "Rupture de stock",
    },
  };

  return styles[status] || styles.in;
}

export default function InventoryPage() {
  const { products } = useAdmin();

  /* ================= BACKEND DATA ONLY ================= */
  const lowOrOut = products.filter((p) =>
    ["low", "out"].includes(p.status)
  );

  return (
    <>
      {/* HEADER */}
      <PageHeader
        title="Inventaire"
        description="Suivi des niveaux de stock en temps réel."
      />

      {/* ALERT */}
      {lowOrOut.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mb: 3,
            p: 2,
            borderRadius: 2,
            bgcolor: "rgba(255, 152, 0, 0.1)",
            border: "1px solid rgba(255, 152, 0, 0.3)",
          }}
        >
          <WarningAmberIcon sx={{ color: "#ed6c02" }} />
          <Box>
            <Typography fontWeight={600} color="#ed6c02">
              Attention au stock
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lowOrOut.length} produits signalés par le backend.
            </Typography>
          </Box>
        </Box>
      )}

      {/* TABLE */}
      <Card sx={{ p: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Produit</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Quantité</TableCell>
                <TableCell>Statut</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products.map((p) => {
                const statusStyle = getStatusStyle(p.status);

                return (
                  <TableRow key={p.id}>
                    {/* PRODUCT */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 1,
                            bgcolor: "action.selected",
                            fontSize: "1.2rem",
                          }}
                        >
                          {p.emoji}
                        </Box>

                        <Typography fontWeight={500}>
                          {p.name}
                        </Typography>
                      </Box>
                    </TableCell>

                    {/* SKU */}
                    <TableCell sx={{ color: "text.secondary" }}>
                      {p.sku}
                    </TableCell>

                    {/* STOCK */}
                    <TableCell fontWeight={600}>
                      {p.stock}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell>
                      <Box
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 1,
                          px: 1.2,
                          py: 0.5,
                          borderRadius: 999,
                          border: "1px solid",
                          bgcolor: statusStyle.bg,
                          borderColor: statusStyle.border,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: statusStyle.dot,
                          }}
                        />

                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: statusStyle.text,
                            textTransform: "capitalize",
                          }}
                        >
                          {statusStyle.label}
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}