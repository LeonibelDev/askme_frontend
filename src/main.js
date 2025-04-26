import { createApp } from 'vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'

import 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript.min.js';

// components
import HomeView from './components/blog/HomeBlog.vue'
import PostView from './components/blog/BlogPost.vue'
import PostNew from './components/blog/BlogNew.vue'
import Login from './components/blog/LoginPage.vue'
import Signup from './components/blog/SignupPage.vue'

const routes = [
    {
        path: '/',
        redirect: { path: '/blog', query: { page: '1' } }
    },
    { path: "/blog", component: HomeView },
    { path: "/blog/new", component: PostNew },
    { path: "/blog/:uuid", component: PostView },
    { path: "/login", component: Login },
    { path: "/signup", component: Signup }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
