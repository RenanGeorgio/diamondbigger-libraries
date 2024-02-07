import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';

export interface AccordionClasses {
  root: string;
  rounded: string;
  expanded: string;
  disabled: string;
  gutters: string;
  region: string;
}

export type AccordionClassKey = keyof AccordionClasses;

export function getAccordionUtilityClass(slot: string): string {
  return generateUtilityClass('MuiAccordion', slot);
}

const accordionClasses: AccordionClasses = generateUtilityClasses('MuiAccordion', [
  'root',
  'rounded',
  'expanded',
  'disabled',
  'gutters',
  'region',
]);

export default accordionClasses;