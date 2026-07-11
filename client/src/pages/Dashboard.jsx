import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

import { auth } from "../firebaseConfig";
import { subscribeToTasks } from "../services/taskService";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  MenuItem,
  InputAdornment,
  LinearProgress,
  Box
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {

    if (!auth.currentUser) return;

    const unsubscribe = subscribeToTasks(
      auth.currentUser.uid,
      (data) => {
        setTasks(data);
      }
    );

    return () => unsubscribe();

  }, []);

  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

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

      <Box
        sx={{
          maxWidth: "1200px",
          margin: "auto",
          p: 4
        }}
      >

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
          Manage your tasks efficiently with TaskFlow Pro.
        </Typography>

        {/* Statistics */}

        <Grid
          container
          spacing={3}
          sx={{ mt: 2, mb: 4 }}
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

        {/* Progress */}

        <Card
          sx={{
            mb: 4,
            borderRadius: 3
          }}
        >

          <CardContent>

            <Typography
              variant="h6"
              gutterBottom
            >

              🎯 Overall Progress

            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 12,
                borderRadius: 10,
                mb: 2
              }}
            />

            <Typography>

              {progress}% Completed

            </Typography>

          </CardContent>

        </Card>

        {/* Add Task */}

        <TaskForm />

        <Divider sx={{ my: 4 }} />

        <Typography
          variant="h5"
          fontWeight="bold"
          gutterBottom
        >

          My Tasks

        </Typography>

        {/* Search & Filter */}

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

          </Grid>

        </Grid>

        {/* Tasks */}

        {

          filteredTasks.length === 0 ?

            <Card
              sx={{
                p: 5,
                textAlign: "center",
                borderRadius: 3
              }}
            >

              <Typography
                variant="h5"
                gutterBottom
              >

                🚀 No Tasks Yet

              </Typography>

              <Typography color="text.secondary">

                Create your first task and start being productive!

              </Typography>

            </Card>

            :

            filteredTasks.map(task => (

              <TaskCard

                key={task.id}

                task={task}

              />

            ))

        }

      </Box>

    </>

  );

}

export default Dashboard;