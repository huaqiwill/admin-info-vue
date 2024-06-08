import {createRouter, createWebHistory} from 'vue-router'
import Layout from "@/layout/Layout";

const routes = [
    {
        path: '/',
        name: 'Layout',
        redirect: "user",
        component: Layout,
        children: [
            {
                path: 'user',
                name: 'user',
                component: () => import("@/views/User")
            },
            {
                path: 'book',
                name: 'book',
                component: () => import("@/views/Book")
            },
            {
                path: 'person',
                name: 'Person',
                component: () => import("@/views/Person")
            },
            {
                path: 'password',
                name: 'Password',
                component: () => import("@/views/Password")
            },
            {
                path: 'lendrecord',
                name: 'LendRecord',
                component: () => import("@/views/LendRecord")
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import("@/views/Dashboard")
            },
            {
                path: 'bookwithuser',
                name: 'BookWithUser',
                component: () => import("@/views/BookWithUser")
            },
            {
                path: 'user2',
                name: 'User2',
                component: () => import("@/views/User2")
            },
            {
                path: 'port',
                name: 'Port',
                component: () => import("@/views/Port")
            },
            {
                path: 'country',
                name: 'Country',
                component: () => import("@/views/Country")
            },
            {
                path: 'biology',
                name: 'Biology',
                component: () => import("@/views/Biology")
            },
            {
                path: 'country-find',
                name: 'CountryFind',
                component: () => import("@/views/CountryFind")
            },
            {
                path: 'port-find',
                name: 'PortFind',
                component: () => import("@/views/PortFind")
            },
            {
                path: 'port-check',
                name: 'PortCheck',
                component: () => import("@/views/PortCheck")
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login")
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("@/views/Register")
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router


