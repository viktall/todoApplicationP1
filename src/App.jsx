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
import Logo from "./logo";
import Bgimg from "./bgimg";
import { ToastContainer, toast } from "react-toastify";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AlertDialog from "./Confirm_Deletion";
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

import { CalendarMonth, Cancel, Delete, Edit } from "@mui/icons-material";

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
        contrast: "#212121",
        neutral: "#2a2a2a",
        custom: "#303030",
      },
      background: {
        default: "#212121",
      },
    },
  });

  const light = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#42a5f5",
        contrast: "#f2f2f2",
        neutral: "#e2e2e2",
        custom: "#d0d0d0",
      },
      background: {
        default: "#f2f2f2",
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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={darkTheme ? dark : light}>
        <CssBaseline />
        <Box>
          <AppBar position="fixed" enableColorOnDark>
            <Toolbar variant="dense">
              <Typography component="div">
                {darkTheme ? (
                  <Logo color="#303030" width={30} height={30} />
                ) : (
                  <Logo color="#f2f2f2" width={30} height={30} />
                )}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                edge="end"
                size="large"
                aria-label="theme switch"
                onClick={() => setDarkTheme(!darkTheme)}
              >
                {darkTheme ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
          <Toolbar variant="dense" />

          <Box sx={{ display: { xs: "block", md: "flex" }, height: "100vh" }}>
            <Box
              flex={3}
              sx={{
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                py: 8,
                bgcolor: "primary.neutral",
              }}
            >
              <Box
                sx={{
                  position: "fixed",
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                  textAlign: "center",
                }}
              >
                <Box sx={{ fontSize: 30 }}>{Date.format("lll")}</Box>
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
                py: 8,
                bgcolor: "primary.contrast",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ lineHeight: 1 }}>
                  <Box sx={{ fontSize: "36px" }}>
                    What do you want to do today?
                  </Box>
                  <Box sx={{ fontSize: "14px" }}>
                    Maximize your productivity by having a clear plan for each
                    day
                  </Box>
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
                sx={{ "& .MuiDrawer-paper": { bgcolor: "primary.neutral" } }}
                open={toggleDrawer}
                onClose={() => setToggleDrawer(false)}
              >
                <Box
                  role="presentation"
                  sx={{
                    width: { md: "38vw", sm: "60vw", xs: "100vw" },
                    py: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 7,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Box sx={{ fontSize: 25 }}>{Date.format("lll")}</Box>
                    <Box>
                      {darkTheme ? (
                        <Logo color="#c2c2c2" width={50} height={50} />
                      ) : (
                        <Logo color="#303030" width={50} height={50} />
                      )}
                    </Box>
                  </Box>
                  <Box
                    component="form"
                    onSubmit={HandleSubmit}
                    noValidate
                    autoComplete="off"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <TextField
                      fullWidth
                      id="outlined-multiline-static"
                      label="Enter task"
                      value={task}
                      onChange={(e) => setTask(e.target.value)}
                      autoFocus
                    />

                    <DemoContainer components={["DatePicker", "TimePicker"]}>
                      <DemoItem>
                        <DatePicker
                          label="Date of Completion"
                          value={value}
                          onChange={(newValue) =>
                            setValue(newValue.format("ll"))
                          }
                        />

                        <TimePicker
                          label="Time of Completion"
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
                      bgcolor: "primary.neutral",
                      borderRadius: "5px 5px 0px 0px",
                      p: 2,
                    }}
                  >
                    <Checkbox
                      checked={todo.completed}
                      onClick={() => ON_COMPLETE(todo)}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          color: todo.completed ? "green" : null,
                        },
                      }}
                    />

                    <Box
                      sx={{
                        wordBreak: "break-word",
                        color: todo.completed ? "green" : null,
                        p: 1,
                        cursor: "pointer",
                        flexGrow: 1,
                      }}
                      onClick={() => ON_COMPLETE(todo)}
                    >
                      {todo.label}
                    </Box>

                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      <IconButton
                        edge="start"
                        aria-label="delete-icon"
                        onClick={() => HandleAlertOpen(todo)}
                      >
                        <Delete />
                      </IconButton>

                      <IconButton
                        edge="start"
                        aria-label="Edit-icon"
                        onClick={() => HandleOnEditClick(todo)}
                        disabled={todo.completed}
                      >
                        {todo.completed ? <Cancel /> : <Edit />}
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3, px: 3, py: 1, bgcolor: "primary.custom" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CalendarMonth sx={{ fontSize: 28 }} />
                      <Box sx={{ lineHeight: 1.6, fontSize: 9 }}>
                        <Box>Created on: {todo.todayDate} </Box>
                        <Box>{`Deadline: ${todo.dateObj} ${todo.clockObj}`}</Box>
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
                <Bgimg />
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
          <ToastContainer theme={darkTheme ? "light" : "dark"} />
        </Box>
      </ThemeProvider>
    </LocalizationProvider>
  );
};
export default App;
