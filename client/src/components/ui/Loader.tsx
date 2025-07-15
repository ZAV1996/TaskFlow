import { Loader2 } from "lucide-react";

export default function Loader() {
    return (
        <div className="absolute top-0 left-0 flex items-center justify-center h-full w-full bg-background z-50">
            <Loader2 className="animate-spin " />
        </div>
    )
}
