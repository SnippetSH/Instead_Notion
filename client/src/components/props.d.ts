interface Props {
    className?: string;
    onClick?: () => void;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

interface classNameProps {
    className?: string,
    style?: React.CSSProperties
}

export type { Props, classNameProps };