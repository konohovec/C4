import Vue from 'vue';
import VueRouter from 'vue-router';
// import Home from '../views/Home.vue';
import Todos from '../components/Todos/template.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Todos',
    component: Todos,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
