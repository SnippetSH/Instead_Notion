import type { Props } from '@/components/props'
import { ThemeStore } from '@/api/store/themeStore'
import classNames from 'classnames'

export const Content = ({ children, className, style }: Props) => {
    const theme = ThemeStore(state => state.theme)

    const contentClasses = classNames(
        'border-1.75 p-5 w-1/3 h-1/3 rounded-xl flex flex-col justify-center items-center',
        {
            'border-dark-300': theme === 'light',
            'border-white-300': theme !== 'light',
        },
        className
    );

    return (
        <div className={contentClasses} style={style}>
            {children}
        </div>
    )
}