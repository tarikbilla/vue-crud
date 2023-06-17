import { createRouter, createWebHistory } from "vue-router";
// import components
import AllUsers from "@/components/AllUsers.vue";
import AddUser from "@/components/CreateUser.vue";
import SearchData from "@/components/SearchData.vue";
import SingleUser from "@/components/SingleUser.vue";
import EditUser from "@/components/EditUser.vue";
import DeleteUser from "@/components/DeleteUser.vue";

const routes = [
  {
    path: "/users",
    component: AllUsers,
  },
  {
    path: "/create",
    component: AddUser,
  },
  {
    path: "/search",
    component: SearchData,
  },
  {
    path: '/users/:id',
    name: 'SingleUserData',
    component: SingleUser,
    props: true,
  },
  {
    path: '/edit/:id',
    name: 'EditUser',
    component: EditUser,
  },
  {
    path: '/delete/:id',
    name: 'DeleteUser',
    component: DeleteUser,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
