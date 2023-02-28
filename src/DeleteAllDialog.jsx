import * as React from 'react';
import { DialogContent, DialogTitle, DialogActions, Dialog, Button } from '@mui/material';



export default function DeleteAllDialog({children, setTodoArr, setIsDeleteAll, isDeleteAll, HandleDelAllDiaClose, toast}) {

    const OnDeleteAll =()=>{

        setIsDeleteAll(false)
        setTodoArr([])
        toast.success('Deleted successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light"

          })
        
      }
  

  return (
    <div>
      
      <Dialog
        open={isDeleteAll}
        onClose={HandleDelAllDiaClose}>
        <DialogTitle>
          {children}
        </DialogTitle>
        <DialogContent sx={{width:400}} >
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleDelAllDiaClose}>No</Button>
          <Button onClick={OnDeleteAll}> Yes </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}