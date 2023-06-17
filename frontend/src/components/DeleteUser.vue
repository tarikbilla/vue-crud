<template>
  <div class="container">
    <div class="row">
      <!-- Success and error alerts -->
      <div
        v-if="successMessage"
        class="alert alert-success mt-3 mb-2 col-md-8 mx-auto"
      >
        {{ successMessage }}
      </div>
      <div
        v-if="errorMessage"
        class="alert alert-danger mt-3 mb-2 col-md-8 mx-auto"
      >
        {{ errorMessage }}
      </div>
    </div>
    <div class="row">
      <div class="col-md-8 p-0 m-auto">
        <div class="card">
          <div class="card-header bg-danger text-white">
            Are you sure you want to delete ID: {{ userID }}?
          </div>
          <div class="card-body">
            If you want to delete pelase press "Delete".
          </div>
          <div class="card-footer d-flex">
            <router-link  class="btn btn-link pt-3 col-6" :to="`/users/`">Back to All Users</router-link>
            <button class="btn btn-dark ml-3 col-6">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userID: "",
      errorMessage: "",
      successMessage: "",
    };
  },
  created() {
    this.userID = this.$route.params.id;
    this.successMessage = "Deleted";
  },
};
</script>
