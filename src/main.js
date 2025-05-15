import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'

import 'prismjs';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/themes/prism.css';

// components
import LandingPage from './components/blog/LandingPage.vue';
import HomeView from './components/blog/HomeBlog.vue'
import PostView from './components/blog/BlogPost.vue'
import PostNew from './components/blog/BlogNew.vue'
import Login from './components/blog/LoginPage.vue'
import Signup from './components/blog/SignupPage.vue'
import Profile from './components/blog/UserProfile.vue'

const routes = [
    { path: '/', component: LandingPage },
    { path: "/blog", component: HomeView },
    { path: "/blog/new", component: PostNew },
    { path: "/blog/:uuid", component: PostView },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup },
    { path: "/profile", component: Profile }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
