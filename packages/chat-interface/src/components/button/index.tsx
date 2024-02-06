import { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

export type ButtonTypes = 'button' | 'submit' | 'reset'

export interface Props extends InputHTMLAttributes<HTMLButtonElement> {
  type?: ButtonTypes; 
  className?: any;
  onClick?: () => void;
  children?: React.ReactNode; 
}

const Button: React.FC<Props> = ({ className, ...props }: Props) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center gap-2 justify-center rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none',
        'bg-zinc-600 font-semibold text-zinc-100 hover:bg-zinc-400 active:bg-zinc-800 active:text-zinc-100/70',
        className
      )}
      {...props}
    />
  );
}

export default Button