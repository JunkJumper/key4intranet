import Vue from 'vue'
import VueRouter from 'vue-router'
import Homepage from '../views/Homepage'
import Login from '../views/Login'
import Download from '../views/Download'

Vue.use(VueRouter)

const routes = [{
        path: '/home',
        name: 'Homepage',
        component: Homepage
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/download',
        name: 'Download',
        component: Download
    }
]


const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router