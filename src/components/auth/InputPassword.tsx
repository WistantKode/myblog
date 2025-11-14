import {cn} from '@/lib/utils.ts'

import {Input} from "@/components/ui/input.tsx";
import {Toggle} from "@/components/ui/toggle.tsx";

import {EyeClosed, EyeIcon} from "lucide-react";
import * as React from "react";
import {useState} from "react";

type InputPasswordProps = Omit<React.ComponentProps<'input'>, 'type'>


export const InputPassword: React.FC<InputPasswordProps> = ({className, ...props}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={'relative'}>
            <Input
                type={showPassword ? 'text' : 'password'}
                className={cn('pe-12  placeholder:tracking-normal', !showPassword && 'tracking-widest', className)}
                {...props}
            />

            <Toggle
                type={'button'}
                pressed={showPassword}
                onPressedChange={setShowPassword}
                className={'absolute top-1/2 -translate-y-1/2 right-0.5 size-8'}
            >
                {showPassword ? <EyeClosed/> : <EyeIcon/>}
            </Toggle>
        </div>
    )
}