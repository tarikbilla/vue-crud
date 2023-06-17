<template>
  <div>
    <h2 class="title">Update User Data</h2>
    <form @submit.prevent="submitForm">
      <!-- Success and error alerts -->
      <div v-if="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
      <!-- Username field -->
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          class="form-control"
        />
      </div>
      <!-- Password field -->
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          class="form-control"
        />
      </div>
      <!-- Full Name field -->
      <div class="form-group">
        <label for="fullname">Full Name:</label>
        <input
          type="text"
          id="fullname"
          v-model="fullname"
          required
          class="form-control"
        />
      </div>
      <!-- Submit button -->
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</template>

<script>
import { API_URL } from "@/config.js";
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      fullname: "",
      successMessage: "",
      errorMessage: "",
    };
  },
  created() {
    const userID = this.$route.params.id;
    // Make the HTTP request to fetch user data
    axios
      .get(`${API_URL}/users/${userID}`)
      .then((response) => {
        this.username = response.data.username;
        this.password = response.data.userpassword;
        this.fullname = response.data.userfullname;
      })
      .catch((error) => {
        console.error(error);
      });
  },
  methods: {
    submitForm() {
      const userID = this.$route.params.id;
      axios
        .post(`${API_URL}/edit/${userID}`, {
          username: this.username,
          userpassword: this.password,
          userfullname: this.fullname,
        })
        .then((response) => {
          console.log("Data updated successfully:", response.data);
          this.successMessage = "Data updated successfully";
          this.errorMessage = "";
        })
        .catch((error) => {
          console.error("Error updating data:", error);
          this.successMessage = "";
          this.errorMessage = "Error updating data";
        });
    },
  },
};
</script>

<style>
/* Add some padding to the alerts */
.alert {
  padding: 0.75rem 1.25rem;
}
</style>
