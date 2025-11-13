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

    // @ts-ignore
    return (
        <div
            className={cn('flex flex-col gap-6',className)}
            {...props}
        >
           <Card className={'overflow-hidden p-0'}>
               <CardContent className={'grid p-0 md:grid-cols-12 gap-6 md:grid-cols-2'}>
                   <Form {... form}>
                       <form
                           className={'p-6 md:p-8'}
                           onSubmit={form.handleSubmit(onSubmit)}
                       >
                           <div className={'flex flex-col gap-6'}>
                               <div className={'flex flex-col items-center text-center'}>
                                   <h1 className="text-2xl font-semibold">
                                       {LOGIN_FORM.title}
                                   </h1>
                                   <p className={'text-muted-foreground text-balance'}>
                                       {LOGIN_FORM.description}
                                   </p>
                               </div>

                               <FormField
                                   name={'email'}
                                   control={form.control}
                                   render={({field}) => (
                                       <FormItem className={'grid gap-3'}>
                                           <FormLabel>Email</FormLabel>
                                           <FormControl>
                                               <Input
                                                   placeholder={'john@example'}
                                                   {...field}
                                               />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                               />



                               <FormField
                                   name={'password'}
                                   control={form.control}
                                   render={({field}) => (
                                       <FormItem className={'grid gap-3'}>
                                           <FormLabel>Password</FormLabel>
                                           <FormControl>
                                               <Input
                                                   placeholder={'Enter your secure password'}
                                                   {...field}
                                               />
                                           </FormControl>
                                           <FormMessage/>
                                       </FormItem>
                                   )}
                               />
                           </div>
                       </form>
                   </Form>
               </CardContent>
           </Card>
        </div>
    );
};
export default LoginForm