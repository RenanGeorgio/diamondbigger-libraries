import { PropsWithChildren } from 'react';
import { Accordion as CarbonAccordion } from '@carbon/react';

interface Parms {
  align?: 'start' | 'end';
  className?: string;
  disabled?: boolean;
  isFlush?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export interface Props extends Parms {
  children?: React.ReactNode; 
}

const Accordion = function Accordion({ children, ...rest }: PropsWithChildren<Props>) {
  return (
    <CarbonAccordion {...rest}>{children}</CarbonAccordion>
  );
}

export default Accordion