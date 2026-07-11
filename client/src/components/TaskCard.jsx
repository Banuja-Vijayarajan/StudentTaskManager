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
  MenuItem
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useState } from "react";

import {
  toggleTask,
  deleteTask,
  editTask
} from "../services/taskService";

function TaskCard({ task, onTaskUpdated }) {

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority);

  async function handleToggle() {
    await toggleTask(task.id, task.completed);
    onTaskUpdated();
  }

  async function handleDelete() {

    if (!window.confirm("Delete this task?")) return;

    await deleteTask(task.id);

    onTaskUpdated();

  }

  async function handleSave() {

    await editTask(task.id, {

      title,

      description,

      priority

    });

    setOpen(false);

    onTaskUpdated();

  }

  return (

    <>

      <Card
        elevation={4}
        sx={{
          mb:3,
          borderRadius:4
        }}
      >

        <CardContent>

          <Stack
            direction="row"
            justifyContent="space-between"
          >

            <Typography
              variant="h5"
              sx={{
                textDecoration:
                task.completed?
                "line-through":
                "none"
              }}
            >

              {task.title}

            </Typography>

            <Chip

              label={
                task.completed?
                "Completed":
                task.priority
              }

              color={
                task.completed?
                "success":
                task.priority==="High"?
                "error":
                task.priority==="Medium"?
                "warning":
                "success"
              }

            />

            <Chip

                label={
                task.category || "General"
                }

                sx={{
                ml:1
                }}

            />

          </Stack>

          <Typography
          sx={{my:2}}
          >

            {task.description}

          </Typography>

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

              {task.completed?
              "Undo":
              "Complete"}

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

            onClick={handleDelete}

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

          <Stack spacing={3} sx={{mt:1}}>

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

          <Button
          onClick={()=>setOpen(false)}
          >

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

    </>

  );

}

export default TaskCard;