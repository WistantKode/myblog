"use client";

import React, { PropsWithChildren } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from './button'

const SubmitButton = ({children, ...props}: PropsWithChildren<React.ComponentProps<typeof Button>>) => {
    const {pending} = useFormStatus()

  return (
    <Button 
      type="submit" 
      disabled={pending} 
      aria-disabled={pending}
      className='w-full mt-2'
      {...props}
    >
      {pending ? "submitting...": children}
    </Button>
  )
}

export default SubmitButton