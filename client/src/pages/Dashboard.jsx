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
  Divider
} from "@mui/material";

function Dashboard() {

  const [tasks, setTasks] = useState([]);

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

  return (

    <>
      <Navbar />

      <div style={{ padding: "30px" }}>

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

        {tasks.map(task => (

          <TaskCard
            key={task.id}
            task={task}
            onTaskUpdated={loadTasks}
          />

        ))}

      </div>

    </>

  );

}

export default Dashboard;