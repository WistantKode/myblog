import {Link, useFetcher, useNavigate} from "react-router";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCallback, useEffect} from "react";
import {cn} from '@/lib/utils'

import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Form, FormControl, FormField, FormItem, FormMessage, FormLabel} from "@/components/ui/form.tsx";

import {loginBanner} from '@/assets'
import {LoaderCircleIcon} from "lucide-react";


import type {ActionResponse, AuthResponse, ValidationError} from "../../../types";
type LoginFieldName = 'email' | 'password';


const LOGIN_FORM = {
    title: "Welcome back !",
    description: "Login to your account wistant",
    footerText: "You don't an account ?",
} as const;

const formSchema = z.object({
    email: z
        .string()
        .nonempty('Email is required')
        .max(50, 'Email must be less than 50 characters long')
        .email('Invalid email address')
    password: z
        .string()
        .nonempty('Password is required')
        .min(8, 'Password must be less than 50 characters long')
});


export const LoginForm = () => {
    return (
        <div>
            LoginForm
        </div>
    );
};
export default LoginForm;
