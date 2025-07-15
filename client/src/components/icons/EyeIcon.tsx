import { cva } from "class-variance-authority";
import { Eye, EyeOff } from "lucide-react";
import React from "react";

const eyeVariants = cva(
    "absolute top-1/2 -right-2 transform -translate-y-1/2 text-primary",
    {
        variants: {
            isOpen: {
                true: "",
                false: ""
            }
        },
        defaultVariants: {
            isOpen: false
        }
    }
);
interface IProps extends React.SVGAttributes<HTMLOrSVGElement> {
    isOpen: boolean;
}

function EyeIcon({ isOpen = false, onClick }: IProps) {
    return isOpen ? <Eye className="w-4 h-4" onClick={onClick} /> : <EyeOff className="w-4 h-4" onClick={onClick} />;
}


export { EyeIcon, eyeVariants }


