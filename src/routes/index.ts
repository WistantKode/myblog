import {createBrowserRouter} from "react-router";
import {Login} from "@/pages/auth/login";
import {Signup} from "@/pages/auth/signup.tsx";
import signupAction from "@/routes/actions/auth/signup";
import loginAction from "@/routes/actions/auth/login";

const router = createBrowserRouter([
    {
        path: "/login",
        Component: Login,
        action: loginAction,
    },
    {
        path: '/signup',
        Component: Signup,
        action: signupAction,
    },
    {
        path: '/refresh-token',
    },
    {
        path: '/',
        children: [
            {
                index: true,
            },
            {
                path: 'blogs'
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
                path: 'dashboard',
            },
            {
                path: 'blogs'
            },
            {
                path: 'blogs/create'
            },
            {
                path: 'blogs/:slug/edit'
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
