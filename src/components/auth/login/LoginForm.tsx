import {Link, useFetcher, useNavigate} from "react-router";
import {z} from 'zod'
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import {useCallback, useEffect} from "react";
import {cn} from '@/lib/utils.ts'

import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {InputPassword} from "@/components/auth/InputPassword.tsx";

import {loginBanner} from '@/assets'
import {LoaderCircleIcon} from "lucide-react";

import {Progress} from "@/components/ui/progress";


import type {ActionResponse, AuthResponse, ValidationError} from "@/types";
import {passwordRules} from "@/components/auth/passwordRules";

type LoginFieldName = 'email' | 'password' | 'role';


const LOGIN_FORM = {
    title: "Create an account",
    description: "Enter your email below to create an account",
    footerText: "Already have an account?",
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
        .min(8, 'Password must be at least 8 characters long'),
    role: z.enum(['user', 'admin']),
});


export const LoginForm = ({className, ...props}: React.ComponentProps<'div'>) => {
    const navigate = useNavigate();
    const fetcher = useFetcher();
    const loginResponse = fetcher.data as ActionResponse<AuthResponse>;

    const isLoading = fetcher.state !== 'idle';


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            role: 'user',
        }
    })

    // handle server error response
    useEffect(() => {
        if (!loginResponse) return;
        if (loginResponse.ok) {
            navigate('/', {viewTransition: true});
            return;
        }

        if (!loginResponse.err) return;

        if (loginResponse.err.code !== 'ValidationError') {
            const validationErrors = loginResponse.err as ValidationError;

            Object.entries(validationErrors.errors).forEach((value) => {
                const [, validationError] = value;
                const loginField = validationError.path as LoginFieldName;

                form.setError(
                    loginField,
                    {
                        type: 'custom',
                        message: validationError.msg,
                    },
                    {shouldFocus: true},
                )
            })
        }

    }, [loginResponse]);

    // handle of form submission
    const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
        await fetcher.submit(values, {
            action: '/login',
            method: 'post',
            encType: 'application/json',
        });
    }, [])

    return (
        <div
            className={cn('flex flex-col gap-6',className)}
            {...props}
        >
           <Card className={'overflow-hidden p-0'}>
               <CardContent className={'grid p-0 gap-6 md:grid-cols-2'}>
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
                                   render={({field}) => {
                                       const passwordValue = form.watch('password') || ""
                                       return (
                                           <FormItem className={'grid gap-3'}>
                                               <FormLabel>Password</FormLabel>
                                               <FormControl>
                                                   <InputPassword
                                                       placeholder={'Enter your secure password'}
                                                       {...field}
                                                   />
                                               </FormControl>
                                               <FormMessage/>

                                               {/* ← Affichage conditionnel */}
                                               {passwordValue.length > 0 && (
                                                   <div className="flex flex-col gap-1 mt-2">
                                                       {passwordRules.map((rule, idx) => {
                                                           const isValid = rule.test(passwordValue)
                                                           return (
                                                               <div key={idx}
                                                                    className="flex items-center gap-2 text-sm">
                                <span className={cn(
                                    "w-4 h-4 flex items-center justify-center rounded-full border",
                                    isValid ? "bg-green-500 border-green-500" : "bg-gray-200 border-gray-300"
                                )}>
                                    {isValid && "✓"}
                                </span>
                                                                   <span
                                                                       className={isValid ? "text-green-600" : "text-muted-foreground"}>
                                    {rule.label}
                                </span>
                                                               </div>
                                                           )
                                                       })}
                                                       <Progress
                                                           value={(passwordRules.filter(r => r.test(passwordValue)).length / passwordRules.length) * 100}
                                                           className="mt-2 h-2"/>
                                                   </div>
                                               )}
                                           </FormItem>
                                       )
                                   }}
                               />

                               <Button
                                   type="submit"
                                   className={'w-full'}
                                   disabled={isLoading}
                               >
                                   {isLoading
                                       &&
                                       <LoaderCircleIcon className={'animate-spin'}/>
                                   }
                                   <span>Login</span>
                               </Button>
                           </div>

                           <div className={'mt-4 text-center text-sm'}>
                               {LOGIN_FORM.footerText}{''}
                               <Link
                                   to="/signup"
                                   className={'underline underline-offset-4 hover:text-primary'}
                                   viewTransition
                               >
                                   {'   '}Sign up
                               </Link>
                           </div>
                       </form>
                   </Form>

                   <figure className={'bg-muted relative hidden md:block'}>
                       <img
                           src={loginBanner}
                           alt={'Login image'}
                           height={400}
                           width={400}
                           className="absolute inset-0 w-full h-full object-cover"
                       />
                   </figure>
               </CardContent>
           </Card>

            <div
                className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline-offset-4">
                By clicking continue, you agree to our{'   '}
                <a
                    className={'underline underline-offset-4 hover:text-primary'}
                    href="#">Terms of services
                </a>{'   '}
                and {'   '}
                <a
                    className={'underline underline-offset-4 hover:text-primary'}
                    href="#">
                    Privacy Policy
                </a>
            </div>
        </div>
    );
};
export default LoginForm