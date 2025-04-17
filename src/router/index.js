import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from "@/views/LoginView.vue"
import PlanetsView from "@/views/PlanetsView.vue"
import RoutesView from "@/views/RoutesView.vue";
import ErrorView from "@/views/ErrorView.vue";
import RegisterView from "@/views/RegisterView.vue";
import BookingsView from "@/views/BookingsView.vue";

const routes = [
    {
        path: '/',
        name: 'homeRoute',
        component: HomeView
    },
    {
        path: '/login',
        name: 'loginRoute',
        component: LoginView
    },
    {
        path: '/planets',
        name: 'planetsRoute',
        component: PlanetsView
    },
    {
        path: '/routes',
        name: 'routesRoute',
        component: RoutesView
    },
    {
        path: '/register',
        name: 'registerView',
        component: RegisterView
    },
    {
        path: '/error',
        name: 'errorRoute',
        component: ErrorView
    },
    {
        path: '/my-bookings',
        name: 'bookingRoute',
        component: BookingsView
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
