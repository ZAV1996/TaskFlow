import { cn } from "@/lib/utils"

export function TypographyH1({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h1 {...props} className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-text", className)}>
            {children}
        </h1>
    )
}
export function TypographyH2({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h2 {...props} className={cn("scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
            {children}
        </h2>
    )
}
export function TypographyH3({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 {...props} className={cn("scroll-m-20 text-2xl font-semibold tracking-tight text-text", className)}>
            {children}
        </h3>
    )
}
export function TypographyH4({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h4 {...props} className={cn("scroll-m-20 text-xl font-semibold tracking-tight text-text", className)}>
            {children}
        </h4>
    )
}
export function TypographyP({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p {...props} className={cn("leading-7 [&:not(:first-child)]:mt-6 text-text", className)}>
            {children}
        </p>
    )
}
export function TypographyBlockquote({ className, children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
    return (
        <blockquote {...props} className={cn("mt-6 border-l-2 pl-6 italic text-text", className)} >
            {children}
        </blockquote>
    )
}
export function TypographyMuted({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p {...props} className={cn("text-sm text-text-secondary", className)}>{children}</p>
    )
}
