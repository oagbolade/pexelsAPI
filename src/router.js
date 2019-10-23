import Search from './components/Search.vue'
import Results from './components/Results.vue'
import Modal from './components/Modal.vue'
const routes = [
  { path: "/", component: Search },
  { path: "/modal", component: Modal },
  { path: "/results/:imageSearch", component: Results }
];

export default routes;