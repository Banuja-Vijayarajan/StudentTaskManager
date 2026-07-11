import { useState } from "react";
import { auth } from "../firebaseConfig";
import { addTask } from "../services/taskService";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem
} from "@mui/material";

import AddTaskIcon from "@mui/icons-material/AddTask";

function TaskForm({ onTaskAdded }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Study");
  const [dueDate, setDueDate] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required.");
      return;
    }

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

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setCategory("Study");
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

            <TextField
              select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              fullWidth
            >
              <MenuItem value="High">🔴 High</MenuItem>
              <MenuItem value="Medium">🟡 Medium</MenuItem>
              <MenuItem value="Low">🟢 Low</MenuItem>
            </TextField>

            <TextField
                select
                label="Category"
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                fullWidth
                >

                <MenuItem value="Study">
                    📚 Study
                </MenuItem>

                <MenuItem value="Programming">
                    💻 Programming
                </MenuItem>

                <MenuItem value="Personal">
                    🏠 Personal
                </MenuItem>

                <MenuItem value="Work">
                    💼 Work
                </MenuItem>

            </TextField>

            <TextField
              type="date"
              label="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<AddTaskIcon />}
              sx={{
                borderRadius: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem"
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