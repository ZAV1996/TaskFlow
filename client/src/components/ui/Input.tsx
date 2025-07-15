"use client";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";
import { File, Link, Mail, PenIcon, PhoneIcon, Search } from "lucide-react";
import { EyeIcon } from "../icons/EyeIcon";

const ICON_POSITION = {
    left: "left-1",
    right: "right-1",
};

const ICON_SIZE = {
    sm: "w-6",
    default: "w-8",
    lg: "w-10",
    none: "w-8"
};

const inputVariants = cva(
    "relative w-full rounded-lg text-sm bg-background-secondary text-text",
    {
        variants: {
            type: {
                text: "",
                password: "",
                email: "",
                file: "file:bg-primary dark:file:bg-gray-800 dark:hover:file:bg-gray-900 hover:file:bg-gray-800 file:cursor-pointer file:h-10 file:border-transparent file:text-white file:font-semibold file:px-5 file:mr-5 block relative w-full text-sm text-gray-900 border rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400",
                number: "",
                search: '',
                url: "",
                tel: "",
            },
            variant: {
                default: "border border-border focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:outline-ring",
            },
            size: {
                none: "",
                default: "h-10 px-3 py-2",
                sm: "h-8 px-3 py-1 text-sm",
                lg: "h-12 px-6 py-3 text-lg",
            },
            disabled: {
                true: "opacity-50 cursor-not-allowed",
            },
            iconPosition: {
                left: "pl-9",
                right: "pr-9",
            }
        },
        compoundVariants: [
            {
                type: ["number"],
                className: "pl-3 pr-3",
            },
            {
                type: "file",
                size: "none",
            },
        ],
        defaultVariants: {
            type: "text",
            variant: "default",
            size: "default",
            iconPosition: "right"
        },
    }
);

type InputType = "text" | "password" | "email" | "file" | "number" | "search" | "url" | "tel";
type InputVariant = "default";
type InputSize = "default" | "sm" | "lg" | 'none';

type InputProps = {
    label?: string;
    customIcon?: React.ReactNode;
    iconPosition?: "left" | "right";
    type?: InputType;
    variant?: InputVariant;
    size?: InputSize;
    disabled?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size">

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            type = "text",
            variant,
            size = "default",
            disabled,
            className,
            label,
            id: propId,
            customIcon,
            iconPosition = "right",
            required,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = React.useState(false);
        const generatedId = React.useId();
        const id = propId || generatedId;

        const [inputType, setInputType] = React.useState(type);

        React.useEffect(() => {
            if (type === "password") {
                setInputType(showPassword ? "text" : "password");
            } else {
                setInputType(type);
            }
        }, [type, showPassword]);

        const togglePasswordVisibility = React.useCallback(() => {
            setShowPassword((prev) => !prev);
        }, []);

        const typeIcons: Record<InputType, React.ReactNode> = {
            password: (
                <button
                    onClick={togglePasswordVisibility}
                    type="button"
                    className={cn("hover:opacity-80", { "cursor-not-allowed": disabled })}
                    disabled={disabled}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    <EyeIcon isOpen={showPassword} />
                </button>

            ),
            search: <Search className="size-4 text-text-secondary" aria-hidden />,
            text: <PenIcon className="size-4 text-text-secondary" aria-hidden />,
            email: <Mail className="size-4 text-text-secondary" aria-hidden />,
            file: <File className="size-4 text-text-secondary" aria-hidden />,
            number: null,
            url: <Link className="size-4 text-text-secondary" aria-hidden />,
            tel: <PhoneIcon className="size-4 text-text-secondary" aria-hidden />,
        };

        const IconComponent = React.useMemo(() => {
            return customIcon || typeIcons[type];
        }, [customIcon, inputType]);

        const iconClasses = React.useMemo(() => cn(
            "absolute top-0 h-full flex items-center justify-center",
            ICON_POSITION[iconPosition],
            ICON_SIZE[size!],
            { "cursor-not-allowed opacity-50": disabled }
        ), [iconPosition, size, disabled]);

        return (
            <div className="grid w-full gap-1.5">
                {label && (
                    <Label htmlFor={id} required={required}>
                        {label}
                    </Label>
                )}
                <div className="relative">
                    <input
                        id={id}
                        className={cn(
                            inputVariants({ type, variant, size, disabled, className, iconPosition }),
                        )}
                        type={inputType!}
                        ref={ref}
                        disabled={disabled}
                        required={required}
                        aria-required={required}
                        aria-invalid={props["aria-invalid"]}
                        {...props}
                    />
                    {IconComponent && !disabled && (
                        <div className={iconClasses} aria-hidden="true">
                            {IconComponent}
                        </div>
                    )}
                </div>
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };