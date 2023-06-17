<template>
  <h2 class="title">Add A New User</h2>
  <form @submit.prevent="submitForm">
    <div v-if="successMessage" class="alert alert-success mt-3">
        {{ successMessage }}
      </div>
      <div v-if="errorMessage" class="alert alert-danger mt-3">
        {{ errorMessage }}
      </div>
    <div>
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" required />
    </div>
    <div>
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
    </div>
    <div>
      <label for="fullname">Full Name:</label>
      <input type="text" id="fullname" v-model="fullname" required />
    </div>
    <button type="submit">Add User</button>
  </form>
</template>

<script>

import {API_URL} from '@/config.js';

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
  methods: {
    submitForm() {
      // Send an HTTP POST request to the backend API to insert the data into the database
      fetch(API_URL+"/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.username,
          userpassword: this.password,
          userfullname: this.fullname,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data inserted successfully:", data);
          // Optionally, perform any other actions after successful data insertion
          this.successMessage = "User Added successfully";
          this.errorMessage = "";
        })
        .catch((error) => {
          console.error("Error inserting data:", error);
          // Optionally, handle the error or display an error message
          this.successMessage = "";
          this.errorMessage = "Error Adding data";
        });
    },
  },
};
</script>
