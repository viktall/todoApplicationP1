import React, {useState} from 'react'
import { Button, Box, TextField, Checkbox, IconButton, Divider} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import BrightnessHighRoundedIcon from '@mui/icons-material/BrightnessHighRounded';
import Brightness3RoundedIcon from '@mui/icons-material/Brightness3Rounded';
import AlertDialog from './Confirm_Deletion';
import BgImg from './bgimg'
import FormDialog from './Edit_Dialog';
import DeleteAllDialog from './DeleteAllDialog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from '@mui/system';



function App() {
        const [darkTheme, setDarkTheme] = useState(false)
        const [task, setTask] = useState('')
        const [todoArr, setTodoArr] = useState([])
        const [editTodo, setEditTodo] = useState(null)
        const [isDialogOpen, setIsDialogOpen] = useState(false)
        const [isAlertOpen, setIsAlertOpen] = useState(false)
        const [isDeleteAll, setIsDeleteAll] = useState(false)
        
 
const theme = createTheme({
        palette:{mode: darkTheme? 'dark':'light'}
})


const HandleSubmit = (e)=>{

   const taskText= task.trim();
   
          e.preventDefault()
          if (taskText){

                 const addedTask=taskText.charAt(0).toUpperCase() + taskText.slice(1)
                 setTodoArr([...todoArr, {id:uuidv4(), label:addedTask, completed:false}])

                 toast.success('Task Added', {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                  theme: "light"

                  })

              }else{

                toast.warn('Enter task !', {
                  position: "top-center",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: false,
                  draggable: false,
                  progress: undefined,
                  theme: "light",
              })}

          setTask('')
  }

const ON_COMPLETE = ({id})=>{
            setTodoArr(todoArr.map(st=>
                st.id===id?{
                    ...st,
                    completed:!st.completed
                }:st
            )
)}

const HandleOnEditClick = (todo)=>{

            setEditTodo(todo)
            setIsDialogOpen(true)
}


const UpdateTodo = ({id, label})=>{

  const textEdited= label.trim()
  
  if(textEdited){
      const addedEditedTask=textEdited.charAt(0).toUpperCase() + textEdited.slice(1)
            setEditTodo(null)
            setIsDialogOpen(false)
            setTodoArr(todoArr.map(t=>t.id===id?{
                            ...t, 
                            label:addedEditedTask
                    }: t))
                }else{

                     setIsDialogOpen(false)

                     }
}


const HandleAlertOpen = (todo)=>{

          setEditTodo(todo)
          setIsAlertOpen(true)
}

const HandleAlertClose = ()=>{

          setIsAlertOpen(false)
  
}

const HandleDelAllDiaOpen = ()=>{

          setIsDeleteAll(true)

}

const HandleDelAllDiaClose = () =>{

          setIsDeleteAll(false)
}


const HandleClose = () => {

    setIsDialogOpen(false);

  };


  return (
  <ThemeProvider theme={theme} >
    <CssBaseline />
          <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                <IconButton onClick={()=> setDarkTheme(!darkTheme)}> {darkTheme? <Brightness3RoundedIcon/> : <BrightnessHighRoundedIcon/>} </IconButton>
          </Box>
    <Container maxWidth='md'>
    <Box sx={{height: '100%'}}>
          
          
          <Box  sx={{fontSize:30, display:'flex', justifyContent:'center', alignItems:'center', height:120}}>TODO LIST</Box>
            
                <Box 
                    component='form' 
                    onSubmit={HandleSubmit} 
                    noValidate
                    autoComplete="off"
                    >
                      <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', my:5}}>
                      <TextField
                            label="Enter task" 
                            variant="outlined" 
                            value={task}
                            onChange={e=>setTask(e.target.value)}
                            inputProps={{ maxLength:80}}
                            sx={{width:455, mr:1}}
                            autoFocus
                        />
              
                      <Button 
                            type='submit'
                            sx={{height:'3.4375em'}}
                            size='large' 
                            variant='contained'> Add </Button>

                      </Box>
{todoArr.map((todo)=>(
                
                <Container key={todo.id} maxWidth='md'>        
                <Box sx={{display:'flex', alignItems:'center', p:5}}>

                    
                    <Box sx={{color:todo.completed? '#00C5CD':'', display:'flex', alignItems:'center', flexGrow:1, cursor:'pointer'}} onClick={()=>ON_COMPLETE(todo)} >
                      <Checkbox checked={todo.completed}/>
                      <Box sx={{ wordBreak: "break-word"}}>{todo.label}</Box>
                    </Box>
                    <Box sx={{ mx: 2 }}>
                    <Button 
                          onClick={()=>HandleAlertOpen(todo)} 
                          variant='outlined'> 
                                              Delete 
                    </Button>
                    </Box>
                    <Box>
                    <Button variant='outlined' 
                            onClick={()=>HandleOnEditClick(todo)} 
                            disabled={todo.completed}> 
                                                      {todo.completed? 'Done':'Edit'} 
                    </Button>
                    </Box>
                    
                    
                </Box>  
                    <Box>
                        <Divider/>
                    </Box>  
                </Container>
      ))}

                      {todoArr.length? <Box sx={{my:2, display:'flex', justifyContent:'center' }} >
                                            <Button variant='contained' onClick={HandleDelAllDiaOpen}> Delete All </Button>
                                      </Box> : <Box display='flex' justifyContent='center'><BgImg/></Box>
                      
                    
                      }
                </Box>


              

                      

                        
                        {isDialogOpen && <FormDialog 
                                            UpdateTodo={UpdateTodo} 
                                            editTodo={editTodo} 
                                            isDialogOpen={isDialogOpen} 
                                            HandleClose={HandleClose}/>}
                                            
                        {isAlertOpen && <AlertDialog
                                          editTodo={editTodo}
                                          isAlertOpen={isAlertOpen}
                                          setIsAlertOpen={setIsAlertOpen}
                                          HandleAlertClose={HandleAlertClose}
                                          todoArr={todoArr}
                                          setTodoArr = {setTodoArr}
                                          toast={toast}
                                          > {editTodo.label} </AlertDialog>}   
                                          
                          {isDeleteAll && <DeleteAllDialog
                                            setTodoArr = {setTodoArr}
                                            isDeleteAll={isDeleteAll}
                                            setIsDeleteAll={setIsDeleteAll}
                                            toast={toast}
                                            HandleDelAllDiaClose={HandleDelAllDiaClose}>{'Are you sure you want to delete all task?'}</DeleteAllDialog>}
                            <ToastContainer />
                  
        
    </Box>
    </Container>
    </ThemeProvider>
  );
}

export default App;
