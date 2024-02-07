import {
  AnimationEventHandler,
  AriaAttributes,
  KeyboardEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import { AccordionItem as CarbonAccordionItem } from '@carbon/react';

interface Parms {
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLLIElement>;
  onHeadingClick?: ({
    isOpen,
    event,
  }: {
    isOpen: boolean;
    event: Parameters<MouseEventHandler<HTMLButtonElement>>[0];
  }) => void;
  open?: boolean;
  renderExpando?: (
    props: PropsWithChildren<AccordionToggleProps>
  ) => ReactElement;
  renderToggle?: (
    props: PropsWithChildren<AccordionToggleProps>
  ) => ReactElement;
  title?: ReactNode;
  handleAnimationEnd?: AnimationEventHandler<HTMLElement>;
}

interface AccordionToggleProps {
  'aria-controls'?: AriaAttributes['aria-controls'];
  'aria-expanded'?: AriaAttributes['aria-expanded'];
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onKeyDown?: (event: KeyboardEvent<HTMLButtonElement>) => void;
  type?: 'button';
}

export interface Props extends Parms {
  children?: React.ReactNode; 
}

const AccordionItem = function AccordionItem({ children, ...rest }: PropsWithChildren<Props>) {
  return (
    <CarbonAccordionItem {...rest}>{children}</CarbonAccordionItem>
  );
}

export default AccordionItem