import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Chip
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";

import { toggleTask, deleteTask } from "../services/taskService";

function TaskCard({ task, onTaskUpdated }) {

  async function handleToggle() {
    await toggleTask(task.id, task.completed);
    onTaskUpdated();
  }

  async function handleDelete() {

    const confirmDelete = window.confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    await deleteTask(task.id);

    onTaskUpdated();
  }

  return (

    <Card
      elevation={4}
      sx={{
        mb: 3,
        borderRadius: 4,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 8
        }
      }}
    >

      <CardContent>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{
              textDecoration:
                task.completed ? "line-through" : "none"
            }}
          >
            {task.title}
          </Typography>

          <Chip
            label={
              task.completed
                ? "Completed"
                : "Pending"
            }
            color={
              task.completed
                ? "success"
                : "warning"
            }
          />

        </Stack>

        <Typography
          sx={{
            mt: 2,
            mb: 3
          }}
          color="text.secondary"
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
            startIcon={<CheckCircleIcon />}
            onClick={handleToggle}
          >
            {task.completed
              ? "Undo"
              : "Complete"}
          </Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Delete
          </Button>

        </Stack>

      </CardContent>

    </Card>

  );

}

export default TaskCard;