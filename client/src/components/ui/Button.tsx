import { Props } from '../props';
import { ThemeStore } from '@/api/store/themeStore';
import classNames from 'classnames';

interface ButtonProps extends Props {
    disabled?: boolean;
}

export const Button = ({ className, onClick, children, style, disabled }: ButtonProps) => {

    const theme = ThemeStore(state => state.theme)
    const buttonClass = classNames(
        'text-center text-white font-semibold py-2 px-4 bg-dark-900/20 rounded-lg transition-all duration-100 shadow-md border-none',
        theme === 'light' ? 'text-dark border-dark shadow-dark-300' : 'text-white border-white shadow-dark-900',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-base hover:translate-y-0.5',
        className
    )

    return (
        <button className={buttonClass} onClick={onClick} style={style} disabled={disabled}>
            {children}
        </button>
    )

}