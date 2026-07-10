import { useState } from "react";
import { auth } from "../firebaseConfig";
import { addTask } from "../services/taskService";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack
} from "@mui/material";

import AddTaskIcon from "@mui/icons-material/AddTask";

function TaskForm({ onTaskAdded }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {

    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required.");
      return;
    }

    await addTask({
      title,
      description,
      completed: false,
      userId: auth.currentUser.uid
    });

    setTitle("");
    setDescription("");

    onTaskAdded();

  }

  return (

    <Card
      elevation={5}
      sx={{
        borderRadius: 4,
        mb: 4
      }}
    >

      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          ➕ Add New Task
        </Typography>

        <form onSubmit={handleSubmit}>

          <Stack spacing={3}>

            <TextField
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />

            <TextField
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<AddTaskIcon />}
              sx={{
                borderRadius: 3,
                py: 1.5
              }}
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