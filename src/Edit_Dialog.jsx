import React, {useState} from 'react';
import {Container, DialogActions, DialogContent, DialogTitle, Dialog, TextField, Button} from '@mui/material';


const FormDialog=({editTodo, UpdateTodo, isDialogOpen, HandleClose})=> {
              const[editedText, setEditedText] = useState(editTodo.label)
  
return (
          <Container>
              <Dialog open={isDialogOpen} onClose={HandleClose}>
                        <DialogTitle sx={{width:430}}>Edit task</DialogTitle>
                        <DialogContent>
                                      <TextField
                                        fullWidth
                                        margin="dense"
                                        variant="outlined"
                                        value={editedText}
                                        autoFocus
                                        onChange={(e)=>setEditedText(e.target.value)}
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
                                      />
                        </DialogContent>
                        <DialogActions>
                            <Button 
                                    disableElevation
                                    variant='contained' 
                                    sx={{ bgcolor:'#b3b3b3', color:'#000','&:hover':{bgcolor:'#999999'}}} 
                                    onClick={HandleClose}>No</Button>
                            <Button 
                                    disableElevation
                                    variant='contained' 
                                    onClick={()=>UpdateTodo({...editTodo, label:editedText})}>Yes</Button>
                        </DialogActions>
              </Dialog>
          </Container>
  )}

export default FormDialog;