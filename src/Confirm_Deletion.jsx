import React from 'react';
import { Container, DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, Button } from '@mui/material';

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
                            <DialogTitle>
                                        {"Are you sure you want to delete this task?"}
                            </DialogTitle>
                            <DialogContent sx={{maxWidth:455}}> 
                                        <DialogContentText sx={{ wordBreak: "break-word"}}>
                                                              {children}
                                        </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                        <Button variant='contained' disableElevation size='small' onClick={HandleAlertClose}>Cancel</Button>
                                        <Button variant='contained' disableElevation size='small' onClick={ON_DELETE}>Confirm</Button>
                            </DialogActions>
                        </Dialog>
              </Container>
  )}

export default AlertDialog