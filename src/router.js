import Search from './components/Search.vue'
import Results from './components/Results.vue'
const routes = [
  { path: "/", component: Search },
  { path: "/results/:imageSearch", component: Results }
];

export default routes;