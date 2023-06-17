<!-- frontend/src/components/UsersData.vue -->

<template>
  <div>
    <h1 class="title">Hello {{ user.userfullname }}</h1>
    <table v-if="user">
      <tr>
        <td>ID</td>
        <td>{{ user.ID }}</td>
      </tr>
      <tr>
        <td>Username</td>
        <td>{{ user.username }}</td>
      </tr>
      <tr>
        <td>Password</td>
        <td>{{ user.userpassword }}</td>
      </tr>
      <tr>
        <td>Full Name</td>
        <td>{{ user.userfullname }}</td>
      </tr>
      <tr>
        <td></td>
        <td><router-link :to="'/edit/' + user.ID">Edit</router-link> &nbsp;&nbsp;
        <router-link :to="'/delete/' + user.ID">Delete</router-link></td>
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
      user: [],
    };
  },

  created() {
    const userId = this.$route.params.id;
    // Make the HTTP request to fetch users data
    axios
      .get(API_URL + "/users/" + userId)
      .then((response) => {
        // Assign the response data to the users data property
        this.user = response.data;
        console.log(this.user);
      })
      .catch((error) => {
        console.error(error);
      });
  },
};
</script>
