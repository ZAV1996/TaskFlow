import { Link } from "react-router";
import { Logo as LogoIcon } from '@/components/icons/LogoIcon'
export default function Logo() {
    return (
        <div className="flex justify-start flex-nowrap max-h-[50px] overflow-hidden min-w-[270px] dark:text-gray-200 text-gray-700">
            <Link to="/">
                <LogoIcon className="w-[65px] h-[50px]" />
            </Link>
            <div className="block pt-0 pr-[2px] pb-[2px] sm:pl-[8px]">
                <div className="w-max block uppercase text-base font-bold leading-[19px] font-[Stem]">
                    <Link to="/">улан-удэнский<br />авиационный завод</Link>
                </div>
                <div className="uppercase font-[Stem] font-bold text-[10px] leading-[13px]">
                    <Link target="_blank" to="https://www.rhc.ru">холдинг вертолеты россии</Link>
                </div>
            </div>
        </div>
    )
}
