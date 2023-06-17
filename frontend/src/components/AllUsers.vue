<template>
  <div>
    <h1 class="title">Users Data</h1>
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
import {API_URL} from '@/config.js';
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },

  async created() {
    try {
      const response = await axios.get(`${API_URL}/users`);
      this.users = response.data;
    } catch (error) {
      console.error(error);
    }
  },

};
</script>
