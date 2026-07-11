import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Divider
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EventIcon from "@mui/icons-material/Event";

import { useSnackbar } from "notistack";

import {
  toggleTask,
  deleteTask,
  editTask
} from "../services/taskService";

function TaskCard({ task }) {

  const { enqueueSnackbar } = useSnackbar();

  const [open,setOpen]=useState(false);
  const [deleteOpen,setDeleteOpen]=useState(false);

  const [title,setTitle]=useState(task.title);
  const [description,setDescription]=useState(task.description);
  const [priority,setPriority]=useState(task.priority);

  const borderColor=

    task.priority==="High"

    ? "#f44336"

    : task.priority==="Medium"

    ? "#ff9800"

    : "#4caf50";

  async function handleToggle(){

    await toggleTask(task.id,task.completed);

    enqueueSnackbar(

      task.completed

      ? "Task marked pending"

      : "Task completed 🎉",

      {

        variant:"success"

      }

    );

  }

  async function handleDelete(){

    await deleteTask(task.id);

    enqueueSnackbar(

      "Task Deleted",

      {

        variant:"error"

      }

    );

    setDeleteOpen(false);

  }

  async function handleSave(){

    await editTask(task.id,{

      title,

      description,

      priority

    });

    enqueueSnackbar(

      "Task Updated",

      {

        variant:"success"

      }

    );

    setOpen(false);

  }

  return(

    <>

      <Card

        elevation={4}

        sx={{

          mb:3,

          borderLeft:`8px solid ${borderColor}`,

          transition:"0.3s",

          "&:hover":{

            transform:"translateY(-5px)"

          }

        }}

      >

        <CardContent>

          <Stack

            direction="row"

            justifyContent="space-between"

          >

            <Typography

              variant="h5"

              fontWeight="bold"

              sx={{

                textDecoration:

                task.completed

                ? "line-through"

                : "none"

              }}

            >

              {task.title}

            </Typography>

            <Stack direction="row" spacing={1}>

              <Chip

                label={

                  task.completed

                  ? "Completed"

                  : task.priority

                }

                color={

                  task.completed

                  ? "success"

                  : task.priority==="High"

                  ? "error"

                  : task.priority==="Medium"

                  ? "warning"

                  : "success"

                }

              />

              <Chip

                label={task.category}

                variant="outlined"

              />

            </Stack>

          </Stack>

          <Typography sx={{my:2}}>

            {task.description}

          </Typography>

          <Divider sx={{mb:2}}/>

          {

            task.dueDate &&

            <Typography

              color="text.secondary"

              sx={{

                display:"flex",

                alignItems:"center",

                gap:1,

                mb:2

              }}

            >

              <EventIcon fontSize="small"/>

              Due : {task.dueDate}

            </Typography>

          }

          <Stack

            direction="row"

            spacing={2}

          >

            <Button

              variant="contained"

              color="success"

              startIcon={<CheckCircleIcon/>}

              onClick={handleToggle}

            >

              {

                task.completed

                ? "Undo"

                : "Complete"

              }

            </Button>

            <Button

              variant="contained"

              startIcon={<EditIcon/>}

              onClick={()=>setOpen(true)}

            >

              Edit

            </Button>

            <Button

              variant="contained"

              color="error"

              startIcon={<DeleteIcon/>}

              onClick={()=>setDeleteOpen(true)}

            >

              Delete

            </Button>

          </Stack>

        </CardContent>

      </Card>

      <Dialog

        open={open}

        onClose={()=>setOpen(false)}

        fullWidth

      >

        <DialogTitle>

          Edit Task

        </DialogTitle>

        <DialogContent>

          <Stack spacing={3} sx={{mt:2}}>

            <TextField

              label="Title"

              value={title}

              onChange={(e)=>setTitle(e.target.value)}

            />

            <TextField

              label="Description"

              multiline

              rows={4}

              value={description}

              onChange={(e)=>setDescription(e.target.value)}

            />

            <TextField

              select

              label="Priority"

              value={priority}

              onChange={(e)=>setPriority(e.target.value)}

            >

              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>

            </TextField>

          </Stack>

        </DialogContent>

        <DialogActions>

          <Button onClick={()=>setOpen(false)}>

            Cancel

          </Button>

          <Button

            variant="contained"

            onClick={handleSave}

          >

            Save

          </Button>

        </DialogActions>

      </Dialog>

      <Dialog

        open={deleteOpen}

        onClose={()=>setDeleteOpen(false)}

      >

        <DialogTitle>

          Delete Task

        </DialogTitle>

        <DialogContent>

          <Typography>

            Delete "<strong>{task.title}</strong>"?

          </Typography>

        </DialogContent>

        <DialogActions>

          <Button onClick={()=>setDeleteOpen(false)}>

            Cancel

          </Button>

          <Button

            color="error"

            variant="contained"

            onClick={handleDelete}

          >

            Delete

          </Button>

        </DialogActions>

      </Dialog>

    </>

  );

}

export default TaskCard;