import { Props } from '../props';
import { ThemeStore } from '@/api/store/themeStore';
import classNames from 'classnames';

export const Button = ({ className, onClick, children }: Props) => {
    const theme = ThemeStore(state => state.theme)
    const buttonClass = classNames(
        'text-center text-white font-semibold py-2 px-4 bg-dark-900/20 rounded-lg hover:shadow-base hover:translate-y-0.5 transition-all duration-100 shadow-md border-none',
        theme === 'light' ? 'text-dark border-dark shadow-dark-300' : 'text-white border-white shadow-dark-900',
        className
    )

    return (
        <button className={buttonClass} onClick={onClick}>
            {children}
        </button>
    )

}