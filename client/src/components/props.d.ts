interface Props {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

interface classNameProps {
    className?: string
}

export type { Props, classNameProps };