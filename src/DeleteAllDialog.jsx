import * as React from 'react';
import { Container, DialogContent, DialogTitle, DialogActions, Dialog, Button } from '@mui/material';

const DeleteAllDialog=({children, setTodoArr, setIsDeleteAll, isDeleteAll, HandleDelAllDiaClose, toast})=>{

                        const OnDeleteAll=()=>{
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
                                              })}
  
  return (
            <Container>
                    <Dialog open={isDeleteAll} onClose={HandleDelAllDiaClose}>
                            <DialogTitle>
                                        {children}
                            </DialogTitle>
                            <DialogContent/>
                            <DialogActions>
                                    <Button variant='contained' disableElevation size='small' onClick={HandleDelAllDiaClose}>Cancel</Button>
                                    <Button variant='contained' disableElevation size='small' onClick={OnDeleteAll}>Confirm</Button>
                            </DialogActions>
                    </Dialog>
            </Container>
  )}

export default DeleteAllDialog