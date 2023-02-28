import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({children, editTodo, setIsAlertOpen, isAlertOpen, HandleAlertClose, todoArr, setTodoArr, toast}) {

    const ON_DELETE =()=>{

        setIsAlertOpen(false)
        setTodoArr(todoArr.filter(todo=>todo.id!==editTodo.id))
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
        open={isAlertOpen}
        onClose={HandleAlertClose}>
        <DialogTitle>
          {"Are you sure you want to delete this task?"}
        </DialogTitle>
        <DialogContent sx={{width:400}} >
          <DialogContentText>
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={HandleAlertClose}>Disagree</Button>
          <Button onClick={ON_DELETE}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}