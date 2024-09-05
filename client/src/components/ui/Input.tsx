import classNames from 'classnames';

interface InputProps {
    type?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    label: string;
    className?: string;
}

export const Input: React.FC<InputProps> = ({ type = 'text', value, onChange = () => {}, onKeyDown = () => {}, placeholder, required, className = '', label }) => {
    const inputClasses = classNames(
        'w-3/4 relative my-3.5',
        className
    );

    return (
        <div className={inputClasses}>
            <input 
                type={type}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                required={required}
                className={`in`}
            />
            <label className="in-label">{label}</label>
            <span className="in-span"></span>
        </div>
    )
}
