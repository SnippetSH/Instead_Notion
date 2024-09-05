import { ReactElement, useEffect, useState, useRef } from "react";
import { Props } from "@/components/props";
import { ThemeStore } from "@/api/store/themeStore";
import classNames from "classnames";

interface DropDownProps extends Props {
  isTheme: boolean;
  children: ReactElement<typeof DropDownItem | typeof DropDownTrigger>[];
  width?: string;
}

export const DropDownTrigger = ({ className, children }: Props) => {
  return (
    <div id="dropdowntrigger" className={className}>
      {children}
    </div>
  );
};

export const DropDownItem = ({ className, children }: Props) => {
  const combinedClasses = classNames(
    'px-1 py-1 text-center my-1',
    className
  );

  return (
    <div id="dropdownitem" className={combinedClasses}>
      {children}
    </div>
  );
};

export const DropDownMenu = ({ className, children, isTheme, width }: DropDownProps) => {
  const [trigger, setTrigger] = useState<ReactElement<typeof DropDownTrigger> | null>(null);
  const [notTriggerChildren, setNotTriggerChildren] = useState<ReactElement<typeof DropDownItem>[]>([]);
  const theme = ThemeStore(state => state.theme)

  useEffect(() => {
    // DropDownTrigger와 DropDownItem을 구분
    const triggerElement = children.find((child) => child.type === DropDownTrigger) || null;
    const itemElements = children.filter((child) => child.type === DropDownItem);

    setTrigger(triggerElement as ReactElement<typeof DropDownTrigger> | null);
    setNotTriggerChildren(itemElements as ReactElement<typeof DropDownItem>[]);
  }, [children]);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  const dropdownMenuClasses = classNames(
    'text-left flex items-center',
    className
  );

  return (
    <div id="dropdownmenu" ref={dropdownMenuRef} className={dropdownMenuClasses}>
      <div className="relative">
        <div onClick={() => setIsOpen(!isOpen)}>
          {trigger}
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} absolute ${isTheme ? 'right-0' : ''} w-${width} mt-2 ${theme === 'light' ? 'bg-white-300 text-dark' : 'bg-dark-800 text-white'} rounded-md shadow-xl`}>
          {notTriggerChildren}
        </div>
      </div>
    </div>
  );
};
