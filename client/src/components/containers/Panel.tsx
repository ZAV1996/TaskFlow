import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { HTMLAttributes, forwardRef, ReactElement } from 'react';

const panelVariants = cva('flex rounded-lg p-5 gap-5', {
    variants: {
        variant: {
            default: 'bg-background border border-border',
            ghost: 'bg-transparent border-none shadow-none',
        },
        orientation: {
            vertical: "flex-col",
            horizontal: "flex-row"
        }
    },
    defaultVariants: {
        variant: 'default',
        orientation: "vertical"
    },
});

interface PanelProps
    extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof panelVariants> {
    asChild?: boolean;
}

export const Panel = forwardRef<HTMLDivElement, PanelProps>(
    ({ className, orientation, variant, asChild = false, children, ...props }, ref) => {
        if (asChild) {
            if (!children || !React.isValidElement(children)) {
                throw new Error('Panel: "asChild" requires a single React element as children');
            }

            return React.cloneElement(children as ReactElement, {
                className: cn(panelVariants({ variant, orientation })),
                ref,
                ...props,
            });
        }

        return (
            <div
                ref={ref}
                className={cn(panelVariants({ variant, className, orientation }))}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Panel.displayName = 'Panel';