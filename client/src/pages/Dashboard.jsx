import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import { auth } from "../firebaseConfig";
import { getTasks } from "../services/taskService";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  MenuItem,
  InputAdornment
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  async function loadTasks() {

    if (!auth.currentUser) return;

    const data = await getTasks(auth.currentUser.uid);

    setTasks(data);

  }

  useEffect(() => {

    loadTasks();

  }, []);

  const filteredTasks = tasks.filter(task => {

    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      task.category === categoryFilter;

    return matchesSearch && matchesCategory;

  });

  return (

    <>
      <Navbar />

      <div style={{ padding: "30px", maxWidth: "1200px", margin: "auto" }}>

        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Welcome Back 👋
        </Typography>

        <Typography
          color="text.secondary"
          gutterBottom
        >
          Here's your productivity overview.
        </Typography>

        <Grid
          container
          spacing={3}
          sx={{ mt: 2, mb: 5 }}
        >

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  📋 Total Tasks
                </Typography>

                <Typography variant="h3">
                  {tasks.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  ✅ Completed
                </Typography>

                <Typography variant="h3">
                  {completedTasks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6">
                  ⏳ Pending
                </Typography>

                <Typography variant="h3">
                  {pendingTasks}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

        </Grid>

        <TaskForm onTaskAdded={loadTasks} />

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >
          My Tasks
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ mb: 3 }}
        >

          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Study">📚 Study</MenuItem>
              <MenuItem value="Programming">💻 Programming</MenuItem>
              <MenuItem value="Personal">🏠 Personal</MenuItem>
              <MenuItem value="Work">💼 Work</MenuItem>
            </TextField>
          </Grid>

        </Grid>

        {

          filteredTasks.length === 0 ?

            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ mt: 6 }}
            >

              No tasks found 🚀

            </Typography>

            :

            filteredTasks.map(task => (

              <TaskCard
                key={task.id}
                task={task}
                onTaskUpdated={loadTasks}
              />

            ))

        }

      </div>

    </>

  );

}

export default Dashboard;