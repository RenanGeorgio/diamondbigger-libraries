import { AccordionSkeleton as CarbonAccordionSkeleton } from '@carbon/react';

interface Params {
  align?: 'start' | 'end';
  className?: string;
  count?: number;
  isFlush?: boolean;
  open?: boolean;
}

export interface Props extends Parms {
  children?: React.ReactNode; 
}

const AccordionSkeleton = function AccordionSkeleton({ children, ...rest }: Props) {
  return (
    <CarbonAccordionSkeleton {...rest}>{children}</CarbonAccordionSkeleton>
  );
}

export default AccordionSkeleton