import React, {useState} from 'react'
import { Button, Box, TextField, Checkbox, List, ListItem, ListItemText, ListItemButton, IconButton} from '@mui/material';
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
                 setTodoArr([...todoArr, {id:uuidv4(), label:taskText, completed:false}])

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
            setEditTodo(null)
            setIsDialogOpen(false)
            setTodoArr(todoArr.map(t=>t.id===id?{
                            ...t, 
                            label:textEdited
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
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Box sx={{display:'flex', justifyContent:'flex-end'}}>
          <IconButton onClick={()=> setDarkTheme(!darkTheme)}> {darkTheme? <Brightness3RoundedIcon/> : <BrightnessHighRoundedIcon/>} </IconButton>
    </Box>
    
    <Box sx={{ '& button': { ml:1 }, mx:'auto', maxWidth:600}}>
    <ToastContainer />
    <Box display='flex' justifyContent='center' sx={{my:6, fontSize:30}}>TODO LIST</Box>
      
          <Box 
              component='form' 
              onSubmit={HandleSubmit} 
              display='flex' 
              justifyContent='center'
              sx={{mb:4}}
              noValidate
              autoComplete="off"
              >
        
                <TextField
                      label="Enter task" 
                      variant="outlined" 
                      value={task}
                      onChange={e=>setTask(e.target.value)}
                      inputProps={{ maxLength:40}}
                      sx={{width:355}}
                      autoFocus
                  />
        
                <Button 
                      type='submit' 
                      variant='contained'> Add Task </Button>
          </Box>


        {todoArr.map((todo)=>(
          
                  
                <List key={todo.id}>
                  <ListItem divider>
                    
                    <ListItemButton sx={{color:todo.completed? '#00C5CD':''}} onClick={()=>ON_COMPLETE(todo)} >
                      <Checkbox edge="start" checked={todo.completed}/>
                      <ListItemText primary={todo.label} />
                    </ListItemButton>

                    <Button onClick={()=>HandleAlertOpen(todo)} variant='outlined'> Delete </Button>
                    <Button variant='outlined' 
                            onClick={()=>HandleOnEditClick(todo)} disabled={todo.completed}> {todo.completed? 'Done':'Edit'} </Button>
                  </ListItem>
                  

                </List>    

                 
      
      ))}

                {todoArr.length? <Box display='flex' justifyContent='center' sx={{my:5}} >
                                       <Button variant='contained' onClick={HandleDelAllDiaOpen}> Delete All </Button>
                                 </Box> : <Box display='flex' justifyContent='center'><BgImg/></Box>
                
              
                }

                  
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
                                  
             
    </Box>
    
    </ThemeProvider>
  );
}

export default App;
