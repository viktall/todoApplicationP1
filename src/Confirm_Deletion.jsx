import React from 'react';
import { Box, Container, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, Button } from '@mui/material';

const AlertDialog=({children, editTodo, setIsAlertOpen, isAlertOpen, HandleAlertClose, todoArr, setTodoArr, toast, setEditTodo})=>{

              const ON_DELETE =()=>{
                                    setIsAlertOpen(false)
                                    setEditTodo(null)
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
                                  })}
  

  return (
              <Container>
                      <Dialog open={isAlertOpen} onClose={HandleAlertClose}>
                        <Box sx={{maxWidth:430}}>
                            <DialogTitle>
                                        {"Are you sure you want to delete this task?"}
                            </DialogTitle>
                            <DialogContent> 
                                        <DialogContentText sx={{ wordBreak: "break-word"}}>
                                                              {children}
                                        </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                        <Button 
                                                disableElevation
                                                variant='contained' 
                                                sx={{ bgcolor:'#b3b3b3', color:'#000','&:hover':{bgcolor:'#999999'}}}
                                                onClick={HandleAlertClose}>No</Button>
                                        <Button 
                                                disableElevation
                                                variant='contained' 
                                                onClick={ON_DELETE}>Yes</Button>
                            </DialogActions>
                            </Box>
                        </Dialog>
              </Container>
  )}

export default AlertDialog