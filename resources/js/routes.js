import VueRouter from 'vue-router';
import Home from './pages/Home.vue';
// import About from './pages/About.vue';
import Projects from './pages/Projects.vue';
import PortfolioItemPage from './pages/PortfolioItemPage.vue';

import PageNotFound from './pages/PageNotFound.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    // {
    //     path: '/about',
    //     name: 'about',
    //     component: About,
    // },
    {
        path: '/projects',
        name: 'projects',
        component: Projects,
    },
    // {
    //     path: '/contact',
    //     name: 'contact',
    //     component: Contact,
    // },
    {
        path: '/portfolio/:id',
        name: 'portfolioPage',
        component: PortfolioItemPage,
        props: true,
    },
    {
        path: '*',
        name: 'pageNotFound',
        component: PageNotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes,
});

export default router;