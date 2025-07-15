import { STATIC_URL } from "@/constants/constants";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getFullUrl(path: string | undefined) {
    if (!path) return null;
    const normalizedPath = path.replace(/\\/g, '/');

    const baseUrl = STATIC_URL.endsWith('/') ? STATIC_URL : `${STATIC_URL}/`;
    const cleanPath = normalizedPath.startsWith('/') ? normalizedPath.slice(1) : normalizedPath;

    return `${baseUrl}${cleanPath}`;
};
