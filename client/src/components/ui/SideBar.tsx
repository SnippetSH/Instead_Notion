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
        <div 
            className={`${className}w-48 h-full ${theme === 'dark' ? 'bg-dark-800' : 'bg-white-600'} fixed ${isOpen ? 'left-0' : '-left-48'} top-0`}
            style={{
                transition: 'left 0.5s ease',
                boxShadow: '5px 0 7px -5px rgba(0, 0, 0, 0.5)'
            }}
        >
            <div className='m-3 h-full relative'>
                {children}
            </div>
        </div>
    )
}

export const SideBarHeader = ({ className = '', children }: Props) => {
    return (
        <div className={`${className} mb-2 `}>
            {children}
        </div>
    )
}

export const SideBarContent = ({ className = '', children }: Props) => {
    return (
        <div className={`${className} w-full mt-4 `}>
            {children}
        </div>
    )
}

export const SideBarFooter = ({ className = '', children }: Props) => {
    return (
        <div className={`${className} absolute bottom-10 flex justify-center items-center w-full `}>
            {children}
        </div>
    )
}