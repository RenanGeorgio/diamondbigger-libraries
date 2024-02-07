import style from './Logo.module.css';

export type Props = {
  backgroundColor: string;
  foregroundColor: string;
  children?: React.ReactNode; 
}

export default function IconLogo({
  backgroundColor = 'transparent',
  foregroundColor = 'var(--accents-1)',
  ...props
}: Props) {
  return (
    <div className={style.container}>
      <svg
        height="40px"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.6482 10.1305L15.8785 7.02583L7.02979 
          22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 
          17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
          fill={foregroundColor}
        />
      </svg>
    </div>
  );
}