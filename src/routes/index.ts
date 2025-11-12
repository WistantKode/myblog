import { createBrowserRouter } from "react-router";
import { Login } from "@/pages/auth/login";

const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
    },
    {
        path: '/signup'
    },
    {
        path: '/refresh-token'
    },
    {
        path: '/',
        children: [
            {
                index: true,
            },
            {
                path: '/blogs'
            },
            {
                path: 'blogs/:slug'
            }
        ]
    },
    {
        path: '/admin',
        children: [
            {
                path: '/dashboard',
            },
            {
                path: '/blogs'
            },
            {
                path: '/blogs/create'
            },
            {
                path: '/blogs/:slug/edit'
            },
            {
                path: 'comments'
            },
            {
                path: 'users'
            }
        ]
    },
    {
        path: '/settings'
    }
]);

export default router;
