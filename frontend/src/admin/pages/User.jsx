import React, { useMemo, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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

import DeleteIcon from "@mui/icons-material/Delete";

import { useDispatch } from "react-redux";

import Loading from "../components/Loading";
import PageHeader from "../components/PageHeader";

import { useUsers } from "../../hooks/useUsers";

import {
  editUser,
  removeUser,
} from "../../features/users/userSlice";

export default function UsersPage() {
  const { users = [], loading } = useUsers();

  const dispatch = useDispatch();

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

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

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <Loading/>
    );
  }

  /* ================= FORMAT DATE ================= */

  const formatDate = (date) => {
    if (!date) return "-";

    const d = new Date(date);

    return isNaN(d) ? "-" : d.toLocaleDateString("fr-FR");
  };

  /* ================= DELETE ================= */

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await dispatch(removeUser(selectedUser.id));

      setOpenDelete(false);

      setSelectedUser(null);
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
      {/* HEADER */}

      <PageHeader
        title="Utilisateurs"
        description="Gérer les utilisateurs du système"
      />

      {/* CARD */}

      <Card
        sx={{
          p: 2,
          borderRadius: 4,
          boxShadow: "var(--shadow-soft)",
        }}
      >
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
              {normalizedUsers.length > 0 ? (
                normalizedUsers.map((u) => (
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
                          onChange={(e) =>
                            handleRoleChange(u.id, e.target.value)
                          }
                          sx={{
                            minWidth: 160,
                            borderRadius: 3,
                          }}
                        >
                          <MenuItem value="user">Utilisateur</MenuItem>

                          <MenuItem value="admin">Administrateur</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>

                    {/* DATE */}

                    <TableCell>{formatDate(u.joined)}</TableCell>

                    {/* ACTIONS */}

                    <TableCell align="right">
                      <DeleteIcon
                        sx={{
                          cursor: "pointer",
                          color: "error.main",
                          transition: "0.2s",

                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                        onClick={() => {
                          setSelectedUser(u);

                          setOpenDelete(true);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    Aucun utilisateur trouvé
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* DELETE DIALOG */}

      <Dialog
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle fontWeight={700}>Supprimer l'utilisateur</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action
            est irréversible.
          </DialogContentText>

          {selectedUser && (
            <DialogContentText sx={{ mt: 2 }}>
              Utilisateur :<strong> {selectedUser.name}</strong>
            </DialogContentText>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={() => setOpenDelete(false)}>
            Annuler
          </Button>

          <Button color="error" variant="contained" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
