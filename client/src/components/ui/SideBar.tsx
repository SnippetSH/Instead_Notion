import { Props } from '@/components/props';
import { ReactElement } from 'react';
import { ThemeStore } from '@/api/store/themeStore';

interface SideBarProps extends Props {
    isOpen: boolean,
    children: ReactElement<typeof SideBarHeader | typeof SideBarContent>[]
}

export const SideBarContainer = ({ className = '', children, isOpen }: SideBarProps) => {
    const theme = ThemeStore(state => state.theme)
    return (
        <div className={`${className} w-48 h-full ${theme === 'dark' ? 'bg-bright-dark' : 'bg-more-less-white'} fixed ${isOpen ? 'left-0' : '-left-48'} top-0 transition-all duration-500`}>
            <div className='m-3'>
                {children}
            </div>
        </div>
    )
}

export const SideBarHeader = ({ className = '', children }: Props) => {
    const theme = ThemeStore(state => state.theme)
    return (
        <div className={`${className} mb-2 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
            {children}
        </div>
    )
}

export const SideBarContent = ({ className = '', children }: Props) => {
    const theme = ThemeStore(state => state.theme)
    return (
        <div className={`${className} mt-4 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
            {children}
        </div>
    )
}