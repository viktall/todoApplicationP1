import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  TextField,
  Checkbox,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  CssBaseline,
  Drawer,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AlertDialog from "./Confirm_Deletion";
import BgImg from "./bgimg";
import FormDialog from "./Edit_Dialog";
import DeleteAllDialog from "./DeleteAllDialog";
import "react-toastify/dist/ReactToastify.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";

import {
  Alarm,
  CalendarMonth,
  Cancel,
  Delete,
  Edit,
} from "@mui/icons-material";

const App = () => {
  const Date = dayjs();

  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [task, setTask] = useState("");
  const [todoArr, setTodoArr] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [editTodo, setEditTodo] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [value, setValue] = useState("");
  const [clockVal, setClock] = useState("");

  const dark = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1565c0",
        dark: "#232323",
        light: "#202020",
      },
    },
  });

  const light = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#42a5f5",
        dark: "#e8e8e8",
        light: "#f2f2f2",
      },
    },
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todoArr));
  }, [todoArr]);
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (task.trim() && value && clockVal) {
      setTodoArr([
        ...todoArr,
        {
          id: uuidv4(),
          label: task.trim().charAt(0).toUpperCase() + task.trim().slice(1),
          completed: false,
          dateObj: value,
          clockObj: clockVal,
          todayDate: Date.format("lll"),
        },
      ]);
      toast.success("Task Added", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        //theme:darkTheme? 'dark':'light',
      });
    } else {
      toast.warn("Enter task !", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        //theme:darkTheme? 'dark':'light'
      });
    }
    setTask("");
    setToggleDrawer(false);
    setValue("");
    setClock("");
  };

  const toggleDrawerHandler = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setToggleDrawer(true);
  };

  const ON_COMPLETE = ({ id }) => {
    setTodoArr(
      todoArr.map((st) =>
        st.id === id ? { ...st, completed: !st.completed } : st
      )
    );
  };

  const UpdateTodo = ({ id, label }) => {
    if (label.trim()) {
      setEditTodo(null);
      setIsDialogOpen(false);
      setTodoArr(
        todoArr.map((t) =>
          t.id === id
            ? {
                ...t,
                label:
                  label.trim().charAt(0).toUpperCase() + label.trim().slice(1),
              }
            : t
        )
      );
    } else {
      setIsDialogOpen(false);
    }
  };

  const HandleOnEditClick = (todo) => {
    setEditTodo(todo);
    setIsDialogOpen(true);
  };

  const HandleAlertOpen = (todo) => {
    setEditTodo(todo);
    setIsAlertOpen(true);
  };

  const HandleAlertClose = () => {
    setEditTodo(null);
    setIsAlertOpen(false);
  };

  const HandleClose = () => {
    setEditTodo(null);
    setIsDialogOpen(false);
  };

  const HandleDelAllDiaOpen = () => {
    setIsDeleteAll(true);
  };

  const HandleDelAllDiaClose = () => {
    setIsDeleteAll(false);
  };

  console.log(clockVal);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme ? dark : light}>
        <CssBaseline />
        <Box>
          <AppBar position="fixed" color="primary" enableColorOnDark>
            <Toolbar variant="dense">
              <Typography
                component="div"
                //sx={{ color: "primary.contrastText" }}
              >
                DOIT
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                edge="end"
                size="large"
                aria-label="theme switch"
                onClick={() => setDarkTheme(!darkTheme)}
                //sx={{ color: "primary.contrastText" }}
              >
                {darkTheme ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Toolbar variant="dense"/>

          <Box sx={{ display: { xs: "block", md: "flex" } }}>
            <Box
              flex={3}
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                alignItems: "center",
                pt: "7%",
                bgcolor: "primary.dark",
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                }}
              >
                <Box sx={{ pb: 8, fontSize: 30 }}>{Date.format("lll")}</Box>
                <DemoContainer components={["DateCalendar"]}>
                  <DateCalendar value={Date} disabled />
                </DemoContainer>
              </Box>
            </Box>

            <Box
              flex={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                py: 7,
                bgcolor: "primary.light",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ fontSize: "40px", lineHeight: 1 }}>
                  What do you want to do today?
                </Box>
                <Box sx={{ fontSize: "16px" }}>
                  Maximize your productivity by having a clear plan for each day
                </Box>
                <Box sx={{ py: 5 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={toggleDrawerHandler}
                  >
                    Add Task
                  </Button>
                </Box>
              </Box>
              <Drawer
                anchor="left"
                sx={{ "& .MuiDrawer-paper": { bgcolor:"primary.dark" } }}
                open={toggleDrawer}
                onClose={() => setToggleDrawer(false)}
              >
                <Box
                  sx={{ width: { md: "40vw", xs: "100vh" } }}
                  role="presentation"
                >
                  <Box
                    component="form"
                    onSubmit={HandleSubmit}
                    noValidate
                    autoComplete="off"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 5,
                      pt: 10,
                    }}
                  >
                    <TextField
                      id="outlined-multiline-static"
                      label="Enter task"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      autoFocus
                    />

                    <DemoContainer components={["DatePicker", "TimePicker"]}>
                      <DemoItem label="deadline">
                        <DatePicker
                          value={value}
                          onChange={(newValue) =>
                            setValue(newValue.format("ll"))
                          }
                        />

                        <TimePicker
                          value={clockVal}
                          onChange={(newValue) =>
                            setClock(newValue.format("LT"))
                          }
                        />
                      </DemoItem>
                    </DemoContainer>

                    <Button type="submit" size="large" variant="contained">
                      Add
                    </Button>
                  </Box>
                </Box>
              </Drawer>
              {todoArr.map((todo) => (
                <Box
                  key={todo.id}
                  sx={{ width: { md: "80%", sm: "90%", xs: "100%" } }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      bgcolor: "primary.dark",
                      borderRadius: "10px 10px 0px 0px",
                      p: 5,
                    }}
                  >
                    <Box
                      sx={{
                        "& .MuiSvgIcon-root": {
                          color: todo.completed ? "green" : null,
                        },
                      }}
                      onClick={() => ON_COMPLETE(todo)}
                    >
                      <Checkbox checked={todo.completed} />
                    </Box>

                    <Box
                      sx={{
                        wordBreak: "break-word",
                        color: todo.completed ? "green" : null,
                        p: 3,
                        cursor: "pointer",
                        flexGrow: 1,
                      }}
                      onClick={() => ON_COMPLETE(todo)}
                    >
                      {todo.label}
                    </Box>

                    <Box>
                      <Box sx={{ mb: 2 }}>
                        <IconButton
                          edge="end"
                          size="large"
                          aria-label="delete-icon"
                          onClick={() => HandleAlertOpen(todo)}
                        >
                          <Delete />
                        </IconButton>
                      </Box>
                      <Box>
                        <IconButton
                          edge="end"
                          size="large"
                          aria-label="Edit-icon"
                          onClick={() => HandleOnEditClick(todo)}
                          disabled={todo.completed}
                        >
                          {todo.completed ? <Cancel /> : <Edit />}
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      mb: 1,
                      px: 6,
                      py: 2,
                      bgcolor: "#ccc",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <CalendarMonth sx={{ fontSize: 32 }} />
                      <Box sx={{ lineHeight: 1.4, fontSize: 12 }}>
                        <Box>Created on:{todo.todayDate} </Box>
                        <Box>{`Deadline:${todo.dateObj} ${todo.clockObj}`}</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
              {todoArr.length ? (
                <Box>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={HandleDelAllDiaOpen}
                  >
                    Delete All
                  </Button>
                </Box>
              ) : (
                <Box>
                  <BgImg />
                </Box>
              )}
            </Box>
          </Box>
          {isDialogOpen && (
            <FormDialog
              UpdateTodo={UpdateTodo}
              editTodo={editTodo}
              isDialogOpen={isDialogOpen}
              HandleClose={HandleClose}
            />
          )}
          {isAlertOpen && (
            <AlertDialog
              editTodo={editTodo}
              setEditTodo={setEditTodo}
              isAlertOpen={isAlertOpen}
              setIsAlertOpen={setIsAlertOpen}
              HandleAlertClose={HandleAlertClose}
              todoArr={todoArr}
              setTodoArr={setTodoArr}
              toast={toast}
            >
              {editTodo.label}
            </AlertDialog>
          )}
          {isDeleteAll && (
            <DeleteAllDialog
              setTodoArr={setTodoArr}
              isDeleteAll={isDeleteAll}
              setIsDeleteAll={setIsDeleteAll}
              toast={toast}
              HandleDelAllDiaClose={HandleDelAllDiaClose}
            >
              {"Are you sure you want to delete all task?"}
            </DeleteAllDialog>
          )}
          <ToastContainer theme={darkTheme? "light":'red'}/>
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
export default App;
