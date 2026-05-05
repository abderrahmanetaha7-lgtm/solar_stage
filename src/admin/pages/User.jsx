import { useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Avatar,
} from "@mui/material";

import PageHeader from "../components/PageHeader";
import { useAdmin } from "../hooks/useAdmin";

export default function UsersPage() {
  const { users = [], deleteUser } = useAdmin();

  /* ================= NORMALIZATION ================= */
  const normalizedUsers = useMemo(() => {
    return users.map((u) => {
      const name = u.name || "Inconnu";

      return {
        id: u.id,
        name,
        email: u.email || "-",
        joined: u.created_at || "",
        initials: name
          .trim()
          .split(" ")
          .filter(Boolean)
          .map((s) => s[0])
          .slice(0, 2)
          .join("")
          .toUpperCase(),
      };
    });
  }, [users]);

  /* ================= FORMAT DATE ================= */
  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return isNaN(d) ? "-" : d.toLocaleDateString("en-GB");
  };

  /* ================= DELETE ================= */
  const handleDelete = async (user) => {
    if (!window.confirm("Êtes-vous sûr ?")) return;

    try {
      await deleteUser(user.id);
      console.log("Supprimé :", user.id);
    } catch (err) {
      console.error("Erreur de suppression :", err);
    }
  };

  return (
    <>
      <PageHeader
        title="Utilisateurs"
        description="Gérer les utilisateurs du système"
      />

      <Card sx={{ p: 2 }}>
        <TableContainer>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>Utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Inscrit le</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {normalizedUsers.map((u) => (
                <TableRow key={u.id}>

                  {/* USER */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar>{u.initials}</Avatar>
                      <Typography fontWeight={500}>{u.name}</Typography>
                    </Box>
                  </TableCell>

                  {/* EMAIL */}
                  <TableCell>{u.email}</TableCell>

                  {/* DATE */}
                  <TableCell>{formatDate(u.joined)}</TableCell>

                  {/* ACTIONS */}
                  <TableCell align="right">
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>

                      {/* EDIT (disabled for now) */}
                      <Button disabled>
                        <EditIcon />
                      </Button>

                      {/* DELETE */}
                      <Button
                        onClick={() => handleDelete(u)}
                        sx={{ color: "error.main" }}
                      >
                        <DeleteIcon />
                      </Button>

                    </Box>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Table>
        </TableContainer>
      </Card>
    </>
  );
}