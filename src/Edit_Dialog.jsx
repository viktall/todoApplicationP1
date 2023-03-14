import React, {useState} from 'react';
import { Container, DialogActions, DialogContent, DialogTitle, Dialog, TextField, Button} from '@mui/material';


const FormDialog=({editTodo, UpdateTodo, isDialogOpen, HandleClose})=> {
              const[editedText, setEditedText] = useState(editTodo.label)
  
return (
          <Container>
              <Dialog open={isDialogOpen} onClose={HandleClose}>
                        <DialogTitle>Edit Todo</DialogTitle>
                        <DialogContent>
                                      <TextField
                                        margin="dense"
                                        variant="outlined"
                                        value={editedText}
                                        autoFocus
                                        onChange={(e)=>setEditedText(e.target.value)}
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                      />
                        </DialogContent>
                        <DialogActions>
                            <Button variant='outlined' disableElevation size='small' onClick={HandleClose}>Cancel</Button>
                            <Button variant='contained' disableElevation size='small' onClick={()=>UpdateTodo({...editTodo, label:editedText})}>Confirm</Button>
                        </DialogActions>
              </Dialog>
          </Container>
  )}

export default FormDialog;