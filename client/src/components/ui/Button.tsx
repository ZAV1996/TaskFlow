import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from '@/lib/utils'

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                primary: `
                text-text-on_primary
                bg-primary
                active:bg-primary-dark
                hover:bg-primary-dark/85
                focus:bg-primary-dark
                font-semibold 
                active:outline      
                active:outline-2      
                active:outline-offset-2     
                active:outline-primary-dark 
                focus:outline      
                focus:outline-2      
                focus:outline-offset-2     
                focus:outline-primary-dark/70
                `,
                destructive: `
                text-text-on_primary
                bg-error-dark 
                active:bg-error-dark
                hover:bg-error-dark/85
                hover:text-text-on_primary
                focus:bg-error-dark
                font-semibold 
                active:outline      
                active:outline-2      
                active:outline-offset-2     
                active:outline-error-dark    
                focus:outline      
                focus:outline-2      
                focus:outline-offset-2     
                focus:outline-error    
                `,
                outline: `
                text-sm 
                text-text 
                bg-background 
                hover:bg-background-secondary 
                active:bg-background-secondary
                focus:bg-background-secondary
                border 
                border-border 
                font-semibold 
                active:outline      
                active:outline-2      
                active:outline-offset-2     
                active:outline-background-secondary   
                focus:outline      
                focus:outline-2      
                focus:outline-offset-2     
                focus:outline-background-tertiary 
                `,
                secondary: `
                text-text 
                bg-background-tertiary 
                active:bg-background-secondary
                hover:bg-background-tertiary/60
                `,

                light: `
                text-gray-900 
                bg-white border 
                border-gray-300 
                focus:outline-none 
                hover-never:bg-gray-100 
                focus:ring-4 focus:ring-gray-100  
                dark:bg-gray-800 
                dark:text-white 
                dark:border-gray-600 
                dark:hover-never:bg-gray-700 
                dark:hover-never:border-gray-600 
                dark:focus:ring-gray-700`,
                
                ghost: "hover:bg-background-tertiary hover:text-text",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 rounded-md px-3 text-xs",
                lg: "h-10 rounded-md px-8",
                icon: "h-9 w-9",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
