import NavProjectSettings from "@/components/navigate/NavProjectSettings";
import SettingsLayout from "./SettingsLayout";

export default function ProjectSettingsLayout() {
    return (
        <SettingsLayout layoutTitle="Настройки проекта">
            <NavProjectSettings />
        </SettingsLayout>
    )
}
