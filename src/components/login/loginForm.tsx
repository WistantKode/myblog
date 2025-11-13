import {Link, useFetcher, useNavigate} from "react-router";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useCallback, useEffect} from "react";
import {cn} from '@/lib/utils.ts'

import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Form, FormControl, FormField, FormItem, FormMessage, FormLabel} from "@/components/ui/form.tsx";

import {loginBanner} from '@/assets'
import {LoaderCircleIcon} from "lucide-react";


import type {ActionResponse, AuthResponse, ValidationError} from "../../types";
import * as React from "react";
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
        .email('Invalid email address'),
    password: z
        .string()
        .nonempty('Password is required')
        .min(8, 'Password must be less than 50 characters long'),
});


const LoginForm = ({className, ...props}: React.ComponentProps<'div'>) => {
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const loginResponse = fetcher.data as ActionResponse<AuthResponse>;

    const isSubmitting = fetcher.state === "submitting";
    const isLoading = fetcher.state === "loading";

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
        console.log(values)
    } , [])

    return (
        <div
            className={cn('flex flex-col gap-6',className)}
            {...props}
        >
           <Card>
               <CardContent>
                   <Form {... form}>
                       <form
                           className=""
                           onSubmit={form.handleSubmit(onSubmit)}
                       >
                       </form>
                   </Form>
               </CardContent>
           </Card>
        </div>
    );
};
export default LoginForm