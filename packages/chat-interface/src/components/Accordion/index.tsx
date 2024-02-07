import clsx from 'clsx';
import { composeClasses } from '../../utils/compose-classes';
import styled from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import Collapse from '../Collapse';
import Paper from '../Paper';
import AccordionContext from './AccordionContext';
import useControlled from '../utils/useControlled';
import useSlot from '../utils/useSlot';
import accordionClasses, { getAccordionUtilityClass } from './accordionClasses';

const useUtilityClasses = (ownerState) => {
  const { classes, square, expanded, disabled, disableGutters } = ownerState;

  const slots = {
    root: [
      'root',
      !square && 'rounded',
      expanded && 'expanded',
      disabled && 'disabled',
      !disableGutters && 'gutters',
    ],
    region: ['region'],
  };

  return composeClasses(slots, getAccordionUtilityClass, classes);
};

const AccordionRoot = styled(Paper, {
  name: 'MuiAccordion',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const { ownerState } = props;

    return [
      { [`& .${accordionClasses.region}`]: styles.region },
      styles.root,
      !ownerState.square && styles.rounded,
      !ownerState.disableGutters && styles.gutters,
    ];
  },
})(
  ({ theme }) => {
    const transition = {
      duration: theme.transitions.duration.shortest,
    };

    return {
      position: 'relative',
      transition: theme.transitions.create(['margin'], transition),
      overflowAnchor: 'none', // Keep the same scrolling position
      '&::before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: (theme.vars || theme).palette.divider,
        transition: theme.transitions.create(['opacity', 'background-color'], transition),
      },
      '&:first-of-type': {
        '&::before': {
          display: 'none',
        },
      },
      [`&.${accordionClasses.expanded}`]: {
        '&::before': {
          opacity: 0,
        },
        '&:first-of-type': {
          marginTop: 0,
        },
        '&:last-of-type': {
          marginBottom: 0,
        },
        '& + &': {
          '&::before': {
            display: 'none',
          },
        },
      },
      [`&.${accordionClasses.disabled}`]: {
        backgroundColor: (theme.vars || theme).palette.action.disabledBackground,
      },
    };
  },
  ({ theme, ownerState }) => ({
    ...(!ownerState.square && {
      borderRadius: 0,
      '&:first-of-type': {
        borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
      },
      '&:last-of-type': {
        borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
        borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
        // Fix a rendering issue on Edge
        '@supports (-ms-ime-align: auto)': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      },
    }),
    ...(!ownerState.disableGutters && {
      [`&.${accordionClasses.expanded}`]: {
        margin: '16px 0',
      },
    }),
  }),
);

const Accordion = React.forwardRef(function Accordion(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiAccordion' });
  const {
    children: childrenProp,
    className,
    defaultExpanded = false,
    disabled = false,
    disableGutters = false,
    expanded: expandedProp,
    onChange,
    square = false,
    slots = {},
    slotProps = {},
    TransitionComponent: TransitionComponentProp,
    TransitionProps: TransitionPropsProp,
    ...other
  } = props;

  const [expanded, setExpandedState] = useControlled({
    controlled: expandedProp,
    default: defaultExpanded,
    name: 'Accordion',
    state: 'expanded',
  });

  const handleChange = React.useCallback(
    (event) => {
      setExpandedState(!expanded);

      if (onChange) {
        onChange(event, !expanded);
      }
    },
    [expanded, onChange, setExpandedState],
  );

  const [summary, ...children] = React.Children.toArray(childrenProp);
  const contextValue = React.useMemo(
    () => ({ expanded, disabled, disableGutters, toggle: handleChange }),
    [expanded, disabled, disableGutters, handleChange],
  );

  const ownerState = {
    ...props,
    square,
    disabled,
    disableGutters,
    expanded,
  };

  const classes = useUtilityClasses(ownerState);

  const backwardCompatibleSlots = { transition: TransitionComponentProp, ...slots };
  const backwardCompatibleSlotProps = { transition: TransitionPropsProp, ...slotProps };

  const [TransitionSlot, transitionProps] = useSlot('transition', {
    elementType: Collapse,
    externalForwardedProps: {
      slots: backwardCompatibleSlots,
      slotProps: backwardCompatibleSlotProps,
    },
    ownerState,
  });

  delete transitionProps.ownerState;

  return (
    <AccordionRoot
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      square={square}
      {...other}
    >
      <AccordionContext.Provider value={contextValue}>{summary}</AccordionContext.Provider>
      <TransitionSlot in={expanded} timeout="auto" {...transitionProps}>
        <div
          aria-labelledby={summary.props.id}
          id={summary.props['aria-controls']}
          role="region"
          className={classes.region}
        >
          {children}
        </div>
      </TransitionSlot>
    </AccordionRoot>
  );
});

export default Accordion;