import { createWebHistory, createRouter } from "vue-router";
import { createApp } from 'vue'
import App from './App.vue'

const routes =  [
  {
    path: "/",
    alias: "/ShowData",
    name: "ShowData",
    component: () => import("./components/ShowData.vue")
  },
  {
    path: "/Update/:id",
    name: "Update Data",
    component: () => import("./components/UpdateData.vue")
  },
  {
    path: "/Add",
    name: "Add Item",
    component: () => import("./components/Add.vue")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app')