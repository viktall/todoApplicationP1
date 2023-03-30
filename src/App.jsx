import React, {useState, useEffect} from 'react'
import { Button, Box, TextField, Checkbox, Container, IconButton, Typography, Toolbar, AppBar, CssBaseline} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import { ThemeProvider, createTheme} from '@mui/material/styles';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import AlertDialog from './Confirm_Deletion';
import BgImg from './bgimg'
import FormDialog from './Edit_Dialog';
import DeleteAllDialog from './DeleteAllDialog';
import 'react-toastify/dist/ReactToastify.css';
import Styles from './asset/styles'

const App=()=>{

        const [darkTheme, setDarkTheme] = useState(false)
        const [task, setTask] = useState('')
        const [todoArr, setTodoArr] = useState(() => JSON.parse(localStorage.getItem("tasks"))||[])
        const [editTodo, setEditTodo] = useState(null)
        const [isAlertOpen, setIsAlertOpen] = useState(false)
        const [isDialogOpen, setIsDialogOpen] = useState(false)
        const [isDeleteAll, setIsDeleteAll] = useState(false)
        
        const theme=createTheme({palette:{mode: darkTheme? 'dark':'light'}})

        useEffect(()=>{localStorage.setItem("tasks", JSON.stringify(todoArr))}, [todoArr]);
        const HandleSubmit=(e)=>{
                e.preventDefault()
                if (task.trim()){
                        setTodoArr([...todoArr,{
                                 id:uuidv4(), 
                                 label:task.trim().charAt(0).toUpperCase() + task.trim().slice(1), 
                                 completed:false}])
                        toast.success('Task Added',{
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: false,
                                progress: undefined,
                                theme: "light"
                               })}else{
                        toast.warn('Enter task !',{
                                position: "top-center",
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: false,
                                progress: undefined,
                                theme: "light",
                                })}
                        setTask('')}

        const ON_COMPLETE=({id})=>{
               setTodoArr(todoArr.map(st=>st.id===id?{...st, completed:!st.completed}:st))}

        const UpdateTodo=({id, label})=>{
                if(label.trim()){
                        setEditTodo(null)
                        setIsDialogOpen(false)
                        setTodoArr(todoArr.map(t=>t.id===id?{
                                ...t, 
                                label:label.trim().charAt(0).toUpperCase() + label.trim().slice(1)}: t))
                        }else{
                        setIsDialogOpen(false)}}                  
                                    
                  const HandleOnEditClick=(todo)=>{
                        setEditTodo(todo)
                        setIsDialogOpen(true)}

                  const HandleAlertOpen=(todo)=>{
                        setEditTodo(todo)
                        setIsAlertOpen(true)}

                  const HandleAlertClose=()=>{
                        setEditTodo(null)
                        setIsAlertOpen(false)}

                  const HandleDelAllDiaOpen=()=>{
                        setIsDeleteAll(true)}

                  const HandleDelAllDiaClose=()=>{
                        setIsDeleteAll(false)}

                  const HandleClose=()=>{
                        setIsDialogOpen(false)
                        setEditTodo(null)}
        return (
            <ThemeProvider theme={theme}>
            <CssBaseline />
                <AppBar position="fixed">
                <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit" component="div">
                            TODOLIST
                        </Typography>
                        <Box sx={{ flexGrow: 1}}/>
                        <IconButton 
                                edge="end" 
                                color="inherit" 
                                size="small"
                                aria-label="mode switch"
                                sx={{'& .MuiTouchRipple-root':{border:1}}}
                                onClick={()=> setDarkTheme(!darkTheme)}> {darkTheme? <DarkModeIcon/> : <LightModeIcon/>} 
                        </IconButton> 
                </Toolbar>
                </AppBar>
                <Toolbar sx={{mb:5}}/>
          
                <Container maxWidth='sm'>
                <Box sx={{height:'100%'}}>
                <Box component='form' 
                     onSubmit={HandleSubmit} 
                     noValidate
                     autoComplete="off">
                <Box sx={Styles.FormBox}>
                <TextField label="Enter task" 
                     variant='outlined' 
                     value={task}
                     onChange={e=>setTask(e.target.value)}
                     sx={{width:'100%', mr:1}}
                     autoFocus/>
                <Button type='submit'
                     sx={{height:'3.7em'}}
                     size='large' 
                     variant='contained'>Add</Button>
                </Box>
        {todoArr.map((todo)=>(     
                <Box key={todo.id} sx={Styles.TaskBox}>
                <Box sx={{...Styles.TaskInnerBox}} onClick={()=>ON_COMPLETE(todo)}>
                        <Box sx={{'& .MuiSvgIcon-root':{color:todo.completed?'green':null}}}><Checkbox checked={todo.completed}/></Box>
                        <Box sx={{wordBreak: "break-all", color:todo.completed? 'green':null}}>{todo.label}</Box>
                </Box>
                <Box sx={{ ml:2, mr:1}}>
                <Button onClick={()=>HandleAlertOpen(todo)} 
                        variant='outlined'>Delete </Button>
                </Box>
                <Box>
                <Button variant='outlined' 
                        onClick={()=>HandleOnEditClick(todo)} 
                        disabled={todo.completed}>{todo.completed? 'Done':'Edit'} 
                </Button>
                </Box>
                </Box>))}
        {todoArr.length? 
                <Box sx={Styles.DelBox}>
                <Button variant='contained' 
                        size='large' 
                        onClick={HandleDelAllDiaOpen}>Delete All</Button>
                </Box>
                        : 
                <Box>
                <Box sx={Styles.SvgBox}>
                        <BgImg/>
                </Box>
                <AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0, bgcolor:'0e0e0e'}}>
                <Toolbar sx={{mx:'auto', fontSize:14}}> copyright &copy; 2023 todoList | victor ugwu </Toolbar>
                </AppBar>
                </Box>}
                </Box>
        {isDialogOpen&&<FormDialog 
                        UpdateTodo={UpdateTodo} 
                        editTodo={editTodo} 
                        isDialogOpen={isDialogOpen} 
                        HandleClose={HandleClose}/>}             
        {isAlertOpen && <AlertDialog
                        editTodo={editTodo}
                        setEditTodo={setEditTodo}
                        isAlertOpen={isAlertOpen}
                        setIsAlertOpen={setIsAlertOpen}
                        HandleAlertClose={HandleAlertClose}
                        todoArr={todoArr}
                        setTodoArr = {setTodoArr}
                        toast={toast}
                        > 
                         {editTodo.label} 
                        </AlertDialog>}        
        {isDeleteAll && <DeleteAllDialog
                        setTodoArr = {setTodoArr}
                        isDeleteAll={isDeleteAll}
                        setIsDeleteAll={setIsDeleteAll}
                        toast={toast}
                        HandleDelAllDiaClose={HandleDelAllDiaClose}>
                         {'Are you sure you want to delete all task?'}
                        </DeleteAllDialog>}
                        <ToastContainer/>           
                        </Box>
                </Container>
            </ThemeProvider>
  )}
export default App;
