import React, {useState} from 'react';
import { DialogActions, DialogContent, DialogTitle, Dialog, TextField, Button, Box } from '@mui/material';


const FormDialog=({editTodo, UpdateTodo, isDialogOpen, HandleClose})=> {

        const[editedText, setEditedText] = useState(editTodo.label)
  
  return (
    
      <Dialog open={isDialogOpen} onClose={HandleClose}>
        <DialogTitle>Edit Todo</DialogTitle>
        <DialogContent sx={{width:380}}>
          <Box 
              component='form' 
              autoComplete="off"
              >
          <TextField
            inputProps={{maxLength:80}}
            margin="dense"
            fullWidth
            variant="outlined"
            value={editedText}
            autoFocus
            onChange={(e)=>setEditedText(e.target.value)}
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
          />
        </Box>
         </DialogContent>
          <DialogActions>
               <Button variant='outlined' onClick={HandleClose}>Cancel</Button>
               <Button variant='contained' disableElevation onClick={()=>UpdateTodo({...editTodo, label:editedText})}>Confirm</Button>
          </DialogActions>
        
        
      </Dialog>
      
  );
}

export default FormDialog;