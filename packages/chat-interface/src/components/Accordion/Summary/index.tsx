import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import ButtonBase from '../ButtonBase';
import AccordionContext from '../Accordion/AccordionContext';
import accordionSummaryClasses, {
  getAccordionSummaryUtilityClass,
} from './accordionSummaryClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, expanded, disabled, disableGutters } = ownerState;

  const slots = {
    root: ['root', expanded && 'expanded', disabled && 'disabled', !disableGutters && 'gutters'],
    focusVisible: ['focusVisible'],
    content: ['content', expanded && 'expanded', !disableGutters && 'contentGutters'],
    expandIconWrapper: ['expandIconWrapper', expanded && 'expanded'],
  };

  return composeClasses(slots, getAccordionSummaryUtilityClass, classes);
};

const AccordionSummaryRoot = styled(ButtonBase, {
  name: 'MuiAccordionSummary',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme, ownerState }) => {
  const transition = {
    duration: theme.transitions.duration.shortest,
  };

  return {
    display: 'flex',
    minHeight: 48,
    padding: theme.spacing(0, 2),
    transition: theme.transitions.create(['min-height', 'background-color'], transition),
    [`&.${accordionSummaryClasses.focusVisible}`]: {
      backgroundColor: (theme.vars || theme).palette.action.focus,
    },
    [`&.${accordionSummaryClasses.disabled}`]: {
      opacity: (theme.vars || theme).palette.action.disabledOpacity,
    },
    [`&:hover:not(.${accordionSummaryClasses.disabled})`]: {
      cursor: 'pointer',
    },
    ...(!ownerState.disableGutters && {
      [`&.${accordionSummaryClasses.expanded}`]: {
        minHeight: 64,
      },
    }),
  };
});

const AccordionSummaryContent = styled('div', {
  name: 'MuiAccordionSummary',
  slot: 'Content',
  overridesResolver: (props, styles) => styles.content,
})(({ theme, ownerState }) => ({
  display: 'flex',
  flexGrow: 1,
  margin: '12px 0',
  ...(!ownerState.disableGutters && {
    transition: theme.transitions.create(['margin'], {
      duration: theme.transitions.duration.shortest,
    }),
    [`&.${accordionSummaryClasses.expanded}`]: {
      margin: '20px 0',
    },
  }),
}));

const AccordionSummaryExpandIconWrapper = styled('div', {
  name: 'MuiAccordionSummary',
  slot: 'ExpandIconWrapper',
  overridesResolver: (props, styles) => styles.expandIconWrapper,
})(({ theme }) => ({
  display: 'flex',
  color: (theme.vars || theme).palette.action.active,
  transform: 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  [`&.${accordionSummaryClasses.expanded}`]: {
    transform: 'rotate(180deg)',
  },
}));

const AccordionSummary = React.forwardRef(function AccordionSummary(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAccordionSummary' });
  const { children, className, expandIcon, focusVisibleClassName, onClick, ...other } = props;

  const { disabled = false, disableGutters, expanded, toggle } = React.useContext(AccordionContext);
  const handleChange = (event) => {
    if (toggle) {
      toggle(event);
    }
    if (onClick) {
      onClick(event);
    }
  };

  const ownerState = {
    ...props,
    expanded,
    disabled,
    disableGutters,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <AccordionSummaryRoot
      focusRipple={false}
      disableRipple
      disabled={disabled}
      component="div"
      aria-expanded={expanded}
      className={clsx(classes.root, className)}
      focusVisibleClassName={clsx(classes.focusVisible, focusVisibleClassName)}
      onClick={handleChange}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      <AccordionSummaryContent className={classes.content} ownerState={ownerState}>
        {children}
      </AccordionSummaryContent>
      {expandIcon && (
        <AccordionSummaryExpandIconWrapper
          className={classes.expandIconWrapper}
          ownerState={ownerState}
        >
          {expandIcon}
        </AccordionSummaryExpandIconWrapper>
      )}
    </AccordionSummaryRoot>
  );
});

export default AccordionSummary;