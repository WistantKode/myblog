import {SignupForm} from "@/components/auth/signup/SignupForm.tsx";

export const Signup = () => {
    return (
        <div className="h-dvh flex items-center justify-center p-6 md:p-10">
            <div className={'max-w-sm md:max-w-3xl w-full'}>
                <SignupForm/>
            </div>
        </div>
    )
}