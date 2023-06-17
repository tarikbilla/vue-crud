<!-- frontend/src/App.vue -->

<template>
  <div id="app">
    <header>
      <router-link to="/users">All Users</router-link> |
      <router-link to="/create">Create Data</router-link> | 
      <router-link to="/search">Search Data</router-link> 
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>&copy; 2023 by Tarik Billa</footer>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style>

</style>
