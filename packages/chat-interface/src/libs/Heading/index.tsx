import { Heading as CarbonHeading } from '@carbon/react';
import { HeadingLevel } from './types';

export type HeadingProps = JSX.IntrinsicElements[`h${HeadingLevel}`];

interface Parms {
  props?: HeadingProps;
  ref?: React.Ref<HTMLHeadingElement>;
}

export interface Props extends Parms {
  children?: React.ReactNode; 
}

const Heading = function Heading({ children, ...rest }: Props) {
  return (
    <CarbonHeading {...rest}>{children}</CarbonHeading>
  );
}

export { Heading }