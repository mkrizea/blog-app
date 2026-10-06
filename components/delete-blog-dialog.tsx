"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DeleteBlogDialogProps = {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const DeleteBlogDialog = ({
  title,
  onCancel,
  onConfirm,
}: DeleteBlogDialogProps) => {
  return (
    <Dialog open onClose={onCancel} aria-labelledby="delete-dialog-title">
      <DialogTitle id="delete-dialog-title">Delete post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete “{title}”?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 2, pr: 2 }}>
        <Button
          onClick={onCancel}
          color="inherit"
          sx={{ textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{ textTransform: "none" }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteBlogDialog;
