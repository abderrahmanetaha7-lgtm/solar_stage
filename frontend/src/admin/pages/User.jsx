import { useMemo } from "react";
import { useDispatch } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";

import {
  Avatar,
  Box,
  Card,
  Chip,
  CircularProgress,
  FormControl,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import PageHeader from "../components/PageHeader";
import { useUsers } from "../../hooks/useUsers";

import { removeUser, editUser } from "../../features/users/userSlice";

export default function UsersPage() {
  const { users = [], loading } = useUsers();

  const dispatch = useDispatch();

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

  /* ================= NORMALIZATION ================= */

  const normalizedUsers = useMemo(() => {
    return users.map((u) => {
      const name = u.name || "Inconnu";

      return {
        id: u.id,
        name,
        email: u.email || "-",
        joined: u.created_at || "",
        role: (u.role || "user").toLowerCase(),
        status: (u.status || "active").toLowerCase(),

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

    return isNaN(d) ? "-" : d.toLocaleDateString("fr-FR");
  };

  /* ================= DELETE ================= */

  const handleDelete = async (userId) => {
    if (
      !window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")
    ) {
      return;
    }

    try {
      await dispatch(removeUser(userId));
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= ROLE UPDATE ================= */

  const handleRoleChange = async (userId, role) => {
    try {
      await dispatch(
        editUser({
          id: userId,
          data: { role },
        }),
      );
    } catch (err) {
      console.error(err);
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
            {/* HEAD */}

            <TableHead>
              <TableRow>
                <TableCell>Utilisateur</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rôle</TableCell>
                <TableCell>Inscrit le</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* BODY */}

            <TableBody>
              {normalizedUsers.map((u) => (
                <TableRow key={u.id} hover>
                  {/* USER */}

                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Avatar>{u.initials}</Avatar>

                      <Typography fontWeight={600}>{u.name}</Typography>
                    </Box>
                  </TableCell>

                  {/* EMAIL */}

                  <TableCell>{u.email}</TableCell>

                  {/* ROLE */}

                  <TableCell>
                    <FormControl size="small">
                      <Select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      >
                        <MenuItem value="user">User</MenuItem>

                        <MenuItem value="admin">Admin</MenuItem>

                        <MenuItem value="moderator">Moderator</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>

                  {/* DATE */}

                  <TableCell>{formatDate(u.joined)}</TableCell>

                  {/* ACTIONS */}

                  <TableCell align="right">
                    <Chip
                      label={u.status}
                      color={u.status === "active" ? "success" : "error"}
                      size="small"
                      sx={{ mr: 1 }}
                    />

                    <DeleteIcon
                      sx={{
                        cursor: "pointer",
                        color: "error.main",
                      }}
                      onClick={() => handleDelete(u.id)}
                    />
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
