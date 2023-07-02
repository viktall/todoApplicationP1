import * as React from "react";
import {
  Container,
  DialogContent,
  DialogTitle,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";

const DeleteAllDialog = ({
  children,
  setTodoArr,
  setIsDeleteAll,
  isDeleteAll,
  HandleDelAllDiaClose,
  toast,
}) => {
  const OnDeleteAll = () => {
    setIsDeleteAll(false);
    setTodoArr([]);
    toast.success("Deleted successfully", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <Container>
      <Dialog open={isDeleteAll} onClose={HandleDelAllDiaClose}>
        <DialogTitle>{children}</DialogTitle>
        <DialogContent />
        <DialogActions>
          <Button
            disableElevation
            variant="contained"
            sx={{
              bgcolor: "#b3b3b3",
              color: "#000",
              "&:hover": { bgcolor: "#999999" },
            }}
            onClick={HandleDelAllDiaClose}
          >
            No
          </Button>
          <Button disableElevation variant="contained" onClick={OnDeleteAll}>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DeleteAllDialog;
