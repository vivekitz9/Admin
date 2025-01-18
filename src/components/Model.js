import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Model = ({ handleConfirm, handleCloseModel, open }) => {
  return (
    <>
      <Dialog open={open} onClose={handleCloseModel}>
        <DialogTitle>{"Are you Sure ?"}</DialogTitle>
        {/* <DialogContent>
          <DialogContentText>Are you Sure ?</DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button onClick={handleCloseModel}>No</Button>
          <Button onClick={handleConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Model;
