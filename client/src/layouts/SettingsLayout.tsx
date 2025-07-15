import { Separator } from "@/components/ui/separator";
import { TypographyH3 } from "@/components/ui/Typography";
import { Outlet } from "react-router";

export default function SettingsLayout({ children, layoutTitle }: React.HTMLAttributes<HTMLDivElement> & { layoutTitle: string }) {
    return (
        <div className="flex flex-col gap-5 p-5">
            <TypographyH3>{layoutTitle}</TypographyH3>
            <div className="bg-background shadow-base rounded-lg relative overflow-hidden flex gap-5 p-5">
                <>{children}</>
                <Separator orientation="vertical" />
                <div className="relative flex flex-col gap-5 flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
