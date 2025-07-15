import { ChevronRight, Settings2 } from "lucide-react";
import { Link } from "react-router";

export default function EmptySettingsPlaceholder() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 max-w-md">
                <div className="inline-flex items-center justify-center p-4 mb-4">
                    <Settings2 className="h-12 w-12 text-text animate-pulse" />
                </div>

                <h3 className="text-xl font-medium mb-3">Добро пожаловать в настройки</h3>

                <p className="text-muted-foreground mb-6">
                    Выберите раздел в боковом меню, чтобы начать конфигурацию
                </p>

                <div className="inline-flex items-center text-sm text-text font-medium animate-bounce cursor-pointer">
                    <ChevronRight className="mr-2 h-4 w-4" />
                    <Link to={'./summary'}>Просто кликните на любой пункт</Link>
                </div>
            </div>
        </div>
    )
}
