import LoginForm from "@/components/login/LoginForm.tsx";

export const Login = () => {
    return (
        <div className="h-dvh flex items-center justify-center p-6 md:p-10">
            <div className={'max-w-sm md:max-w-3xl w-full'}>
                <LoginForm/>
            </div>
        </div>
    )
}