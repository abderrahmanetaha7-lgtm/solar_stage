import { useState } from "react";

import {
  Box,
  Typography,
  IconButton,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import Delete from "@mui/icons-material/Delete";
import ImageNotSupportedOutlined from "@mui/icons-material/ImageNotSupportedOutlined";
import { useTranslation } from "react-i18next";

export default function CartItemCard({
  item,
  imageUrl,
  productName,

  showQuantity = true,
  showDelete = true,
  showPrice = true,

  onIncrement,
  onDecrement,
  onDelete,
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    onDelete();

    setOpenDeleteDialog(false);
  };
  const { t } = useTranslation();

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: {
            xs: 2,
            sm: 2.5,
          },

          borderRadius: "24px",

          border: "1px solid",
          borderColor: "divider",

          overflow: "hidden",

          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",

            flexDirection: {
              xs: "column",
              md: "row",
            },

            justifyContent: "space-between",

            gap: 3,

            width: "100%",
          }}
        >
          {/* LEFT SIDE */}
          <Box
            sx={{
              display: "flex",

              alignItems: {
                xs: "flex-start",
                sm: "center",
              },

              gap: {
                xs: 1.5,
                sm: 2.5,
              },

              flex: 1,

              minWidth: 0,
            }}
          >
            {/* IMAGE */}
            <Box
              sx={{
                width: {
                  xs: 85,
                  sm: 110,
                },

                height: {
                  xs: 85,
                  sm: 110,
                },

                borderRadius: "20px",

                overflow: "hidden",

                bgcolor: "grey.100",

                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                flexShrink: 0,
              }}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={productName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <ImageNotSupportedOutlined />
              )}
            </Box>

            {/* INFO */}
            <Box
              sx={{
                minWidth: 0,
                flex: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,

                  fontSize: {
                    xs: "1rem",
                    md: "1.15rem",
                  },

                  lineHeight: 1.3,

                  wordBreak: "break-word",

                  overflowWrap: "break-word",
                }}
              >
                {productName}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 0.5,
                  mb: 1,
                }}
              >
                {item.category?.name}
              </Typography>

              {showPrice && (
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",

                    fontSize: {
                      xs: "0.95rem",
                      sm: "1rem",
                    },
                  }}
                >
                  {Number(item.price).toLocaleString()} {t("currency")}
                </Typography>
              )}
            </Box>
          </Box>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              display: "flex",

              flexDirection: {
                xs: "row",
                sm: "row",
                md: "column",
                lg: "row",
              },

              alignItems: "center",

              justifyContent: {
                xs: "space-between",
                md: "center",
              },

              gap: {
                xs: 1.5,
                sm: 2,
              },

              flexWrap: "wrap",

              width: {
                xs: "100%",
                md: "auto",
              },
            }}
          >
            {/* QUANTITY */}
            {showQuantity && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  border: "1px solid",
                  borderColor: "divider",

                  borderRadius: "14px",

                  px: 0.5,

                  height: 42,

                  flexShrink: 0,
                }}
              >
                <IconButton size="small" onClick={onDecrement}>
                  <Remove fontSize="small" />
                </IconButton>

                <Typography
                  sx={{
                    fontWeight: 700,

                    minWidth: 24,

                    textAlign: "center",
                  }}
                >
                  {item.quantity}
                </Typography>

                <IconButton size="small" onClick={onIncrement}>
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            )}

            {/* TOTAL */}
            <Typography
              sx={{
                fontWeight: 800,

                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                },

                textAlign: {
                  xs: "left",
                  md: "right",
                },

                minWidth: {
                  xs: "auto",
                  sm: 120,
                },

                whiteSpace: "nowrap",
              }}
            >
              {(item.price * item.quantity).toFixed(2)} {t("currency")}
            </Typography>

            {/* DELETE */}
            {showDelete && (
              <IconButton
                color="error"
                onClick={handleOpenDeleteDialog}
                sx={{
                  flexShrink: 0,
                }}
              >
                <Delete />
              </IconButton>
            )}
          </Box>
        </Box>
      </Paper>

      {/* DELETE DIALOG */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete Product</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this product from cart?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>

          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
