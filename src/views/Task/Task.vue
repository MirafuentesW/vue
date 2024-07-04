<template>
  <div>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>
            Tasks
            <RouterLink to="/task/create" class="btn btn-primary float-end">
              Add Task
            </RouterLink>
          </h4>
        </div>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Task</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Updated Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in this.tasks" :key="index">
              <td>{{ task.id }}</td>
              <td>{{ task.task }}</td>
              <td v-if="task.status === 1">Active</td>
              <td v-else>Disabled</td>
              <td>{{ task.created_at }}</td>
              <td>{{ task.updated_at }}</td>
              <td>
                <RouterLink
                  :to="{ path: `/task/${task.id}/edit` }"
                  class="btn btn-success ml-4"
                >
                  Edit
                </RouterLink>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteTask(task.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2';
export default {
  name: "task",
  data() {
    return {
      task: [],
    };
  },
  mounted() {
    this.getTask();
  },
  methods: {
    getTask() {
      axios.get("http://127.0.0.1:8000/todotest").then((res) => {
        this.tasks = res.data.task;
      });
    },

    deleteTask(taskId) {
      Swal.fire({
        title: "Are you sure you want to delete this?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://127.0.0.1:8000/todotest/${taskId}/delete`)
            .then((res) => {
              alert(res.data.message);
              this.getTask();
            });
        }
        return false;
      });
    },
  },
};
</script>
