import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';


const FormDialog=({editTodo, UpdateTodo, isDialogOpen, HandleClose})=> {

const[editedText, setEditedText] = useState(editTodo.label)
console.log(editTodo)
  
  return (
    
      <Dialog open={isDialogOpen} onClose={HandleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent sx={{width:380}}>
          <Box 
              component='form' 
              autoComplete="off"
              >
          <TextField
            inputProps={{maxLength:40}}
            margin="dense"
            fullWidth
            variant="outlined"
            value={editedText}
            autoFocus
            onChange={(e)=>setEditedText(e.target.value)}
          />
        </Box>
         </DialogContent>
          <DialogActions>
               <Button onClick={HandleClose}>Cancel</Button>
               <Button onClick={()=>UpdateTodo({...editTodo, label:editedText})}>Confirm</Button>
          </DialogActions>
        
        
      </Dialog>
      
  );
}

export default FormDialog;