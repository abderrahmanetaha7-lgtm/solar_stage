import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, DialogContentText } from "@mui/material";

const DeleteDialog = ({ open, item, onConfirm, onCancel }) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>Remove Item</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to remove {item?.name} from your cart?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="inherit">Cancel</Button>
      <Button onClick={onConfirm} color="error" variant="contained" autoFocus>Remove</Button>
    </DialogActions>
  </Dialog>
);

export default React.memo(DeleteDialog);