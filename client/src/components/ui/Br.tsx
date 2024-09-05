import classNames from "classnames";
import { classNameProps } from "@/components/props";

export const Br = ({ className, style }: classNameProps) => {
    const brClass = classNames(
        'h-5', 
        className
    )
    return <div 
        className={brClass}
        style={style}
    />
}