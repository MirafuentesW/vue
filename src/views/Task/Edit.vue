<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Edit Task</h4>
      </div>
      <div class="card-body">
        <ul
          v-if="Object.keys(this.errorList).length > 0"
          class="alert alert-warning"
        >
          <li
            v-for="(error, index) in this.errorList"
            :key="index"
            class="mb-0 ms-3"
          >
            {{ error[0] }}
          </li>
        </ul>
        <div class="mb-3">
          <label for="">Task</label>
          <input type="text" class="form-control" v-model="model.task.task" />
        </div>
        <label for="">Status</label>
        <div class="mb-3">
          <label class="radio">
            <input
              type="radio"
              name="answer"
              value="1"
              v-model="model.task.status"
            />
            Active
          </label>
          <label class="radio">
            <input
              type="radio"
              name="answer"
              value="0"
              v-model="model.task.status"
            />
            Disable
          </label>
        </div>
        <div class="mb-3">
          <button type="button" class="btn btn-primary" @click="updateTask()">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "taskEdit",
  data() {
    return {
      taskId: "",
      errorList: "",
      model: {
        task: {
          task: "",
          status: "",
        },
      },
    };
  },
  mounted() {
    this.taskId = this.$route.params.id;
    this.getTaskData(this.$route.params.id);
  },
  methods: {
    getTaskData(taskId) {
      axios
        .get(`http://127.0.0.1:8000/todotest/${taskId}/edit`)
        .then((res) => {
          this.model.task.task = res.data.task.task;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              alert(error.response.data.errors);
            }
          }
        });
    },
    updateTask(taskId) {
      var mythis = this;
      Swal.fire({
        title: "Are you sure you want to save this?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Save",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .put(
              `http://127.0.0.1:8000/todotest/${this.taskId}/update`,
              this.model.task
            )
            .then((res) => {
              alert(res.data.message);
              this.errorList = "";
            })
            .catch((error) => {
              if (error.response) {
                if (error.response.status == 422) {
                  mythis.errorList = error.response.data.errors;
                }
                if (error.response.status == 404) {
                  alert(error.response.data.message);
                }
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log("Error", error.message);
              }
            });
        }
        return false;
      });
    },
  },
};
</script>
