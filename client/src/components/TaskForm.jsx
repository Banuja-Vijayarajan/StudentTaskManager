import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  MenuItem,
  Stack
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import { useSnackbar } from "notistack";

import { auth } from "../firebaseConfig";
import { addTask } from "../services/taskService";

function TaskForm() {

  const { enqueueSnackbar } = useSnackbar();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Study");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    if (!title.trim()) {

      enqueueSnackbar("Enter a task title", {
        variant: "warning"
      });

      return;

    }

    try {

      await addTask({

        title,
        description,
        priority,
        category,
        dueDate,
        completed: false,
        createdAt: new Date(),
        userId: auth.currentUser.uid

      });

      enqueueSnackbar("Task Added 🎉", {
        variant: "success"
      });

      setTitle("");
      setDescription("");
      setPriority("Medium");
      setCategory("Study");
      setDueDate("");

    }

    catch {

      enqueueSnackbar("Failed to add task", {
        variant: "error"
      });

    }

  }

  return (

    <Card sx={{ mb:4 }}>

      <CardContent>

        <Typography
          variant="h5"
          gutterBottom
          fontWeight="bold"
        >

          ➕ Add New Task

        </Typography>

        <form onSubmit={handleSubmit}>

          <Stack spacing={3}>

            <TextField
              label="Title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              required
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

            <TextField
              select
              label="Category"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            >

              <MenuItem value="Study">Study</MenuItem>
              <MenuItem value="Programming">Programming</MenuItem>
              <MenuItem value="Work">Work</MenuItem>
              <MenuItem value="Personal">Personal</MenuItem>

            </TextField>

            <TextField
              type="date"
              label="Due Date"
              value={dueDate}
              onChange={(e)=>setDueDate(e.target.value)}
              InputLabelProps={{
                shrink:true
              }}
            />

            <Button
              variant="contained"
              type="submit"
              startIcon={<AddIcon/>}
            >

              Add Task

            </Button>

          </Stack>

        </form>

      </CardContent>

    </Card>

  );

}

export default TaskForm;