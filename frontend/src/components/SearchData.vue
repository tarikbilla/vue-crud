<template>
  <div>
    <h1 class="title">Search a Users</h1>
    <form @submit="submitForm">
      <div>
        <input type="search" id="search" v-model="search" placeholder="Type here to search user..." required />
      </div>
    </form>
    <br />

    <table border="1">
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Password</th>
        <th>Full Name</th>
        <th>Action</th>
      </tr>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.ID }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.userpassword }}</td>
        <td>{{ user.userfullname }}</td>
        <td>
            <router-link :to="`/users/${user.ID}`">View</router-link>&nbsp;&nbsp;
            <router-link :to="`/edit/${user.ID}`">Edit</router-link>&nbsp;&nbsp;
            <router-link :to="`/delete/${user.ID}`">Delete</router-link>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { API_URL } from "@/config.js";

import axios from "axios";
export default {
  data() {
    return {
      users: [],
    };
  },

  created() {
    // Make the HTTP request to fetch users data
    axios
      .get(API_URL + "/users")
      .then((response) => {
        // Assign the response data to the users data property
        this.users = response.data;
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
