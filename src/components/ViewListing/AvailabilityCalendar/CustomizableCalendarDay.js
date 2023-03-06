import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger, or } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from 'react-dates/lib/defaultPhrases';
import getPhrasePropTypes from 'react-dates/lib/utils/getPhrasePropTypes';
import getCalendarDaySettings from 'react-dates/lib/utils/getCalendarDaySettings';

import { DAY_SIZE } from 'react-dates/lib/constants';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

const { reactDates: { color } } = DefaultTheme;

function getStyles(stylesObj, isHovered) {
  if (!stylesObj) return null;

  const { hover } = stylesObj;
  if (isHovered && hover) {
    return hover;
  }

  return stylesObj;
}

const DayStyleShape = PropTypes.shape({
  background: PropTypes.string,
  border: or([PropTypes.string, PropTypes.number]),
  color: PropTypes.string,

  hover: PropTypes.shape({
    background: PropTypes.string,
    border: or([PropTypes.string, PropTypes.number]),
    color: PropTypes.string,
  }),
});

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  day: momentPropTypes.momentObj,
  daySize: nonNegativeInteger,
  isOutsideDay: PropTypes.bool,
  modifiers: PropTypes.instanceOf(Set),
  isFocused: PropTypes.bool,
  tabIndex: PropTypes.oneOf([0, -1]),
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderDayContents: PropTypes.func,
  ariaLabelFormat: PropTypes.string,

  // style overrides
  defaultStyles: DayStyleShape,
  outsideStyles: DayStyleShape,
  todayStyles: DayStyleShape,
  firstDayOfWeekStyles: DayStyleShape,
  lastDayOfWeekStyles: DayStyleShape,
  highlightedCalendarStyles: DayStyleShape,
  blockedMinNightsStyles: DayStyleShape,
  blockedCalendarStyles: DayStyleShape,
  blockedOutOfRangeStyles: DayStyleShape,
  hoveredSpanStyles: DayStyleShape,
  selectedSpanStyles: DayStyleShape,
  lastInRangeStyles: DayStyleShape,
  selectedStyles: DayStyleShape,
  selectedStartStyles: DayStyleShape,
  selectedEndStyles: DayStyleShape,
  afterHoveredStartStyles: DayStyleShape,

  // internationalization
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
});

export const defaultStyles = {
  color: 'black',
  hover: {
    background: 'linear-gradient(94.59deg, #3C67FE 4.37%, #9153F5 100%)',
    color: 'white',
    opacity: 0.6
  },
};

export const outsideStyles = {
  background: color.outside.backgroundColor,
  border: 0,
  color: color.outside.color,
};

export const highlightedCalendarStyles = {
  background: 'red',
  color: color.highlighted.color,

  hover: {
    background: color.highlighted.backgroundColor_hover,
    color: color.highlighted.color_active,
  },
};

export const blockedMinNightsStyles = {
  background: 'linear-gradient(94.59deg, #3C67FE 4.37%, #9153F5 100%)',
  color: 'black',

  hover: {
    background: 'linear-gradient(94.59deg, #3C67FE 4.37%, #9153F5 100%)',
    color: 'white',
    opacity: 0.6
  },
};

export const blockedCalendarStyles = {
  color: 'rgb(177 173 173)',
  background: 'transparent',
  
  hover: {
    color: 'rgb(177 173 173)',
    background: 'transparent'
  },
};

export const blockedOutOfRangeStyles = {
  color: 'rgb(177 173 173)',
  background: 'transparent'
};

export const hoveredSpanStyles = {
  background: 'linear-gradient(94.59deg, #3C67FE 4.37%, #9153F5 100%)',
  color: 'white',

  hover: {
    background: 'linear-gradient(94.59deg, #3C67FE 4.37%, #9153F5 100%)',
    color: 'white',
    opacity: 0.6
  },
};

export const selectedSpanStyles = {
  background: 'linear-gradient(94.59deg, #3C67FE 4.37%, #9153F5 100%)',
  color: 'white',

  hover: {
    background: 'linear-gradient(94.59deg, #3C67FE 4.37%, #9153F5 100%)',
    color: 'white',
    opacity: 0.6
  },
};

export const lastInRangeStyles = {
  borderRight: color.core.primary,
};

export const selectedStyles = {
  background: 'linear-gradient(94.59deg, #3C67FE 4.37%, #9153F5 100%)',
  color: 'white',
  hover: {
    opacity: 0.8,
    background: 'linear-gradient(94.59deg, #3C67FE 4.37%, #9153F5 100%)',
    color: 'white',
  },
};

const defaultProps = {
  day: moment(),
  daySize: DAY_SIZE,
  isOutsideDay: false,
  modifiers: new Set(),
  isFocused: false,
  tabIndex: -1,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderDayContents: null,
  ariaLabelFormat: 'dddd, LL',

  // style defaults
  defaultStyles,
  outsideStyles,
  todayStyles: {},
  highlightedCalendarStyles,
  blockedMinNightsStyles,
  blockedCalendarStyles,
  blockedOutOfRangeStyles,
  hoveredSpanStyles,
  selectedSpanStyles,
  lastInRangeStyles,
  selectedStyles,
  selectedStartStyles: {},
  selectedEndStyles: {},
  afterHoveredStartStyles: {},
  firstDayOfWeekStyles: {},
  lastDayOfWeekStyles: {},

  // internationalization
  phrases: CalendarDayPhrases,
};

class CustomizableCalendarDay extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      isHovered: false,
    };

    this.setButtonRef = this.setButtonRef.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    const { isFocused, tabIndex } = this.props;
    if (tabIndex === 0) {
      if (isFocused || tabIndex !== prevProps.tabIndex) {
        this.buttonRef.focus();
      }
    }
  }

  onDayClick(day, e) {
    const { onDayClick } = this.props;
    onDayClick(day, e);
  }

  onDayMouseEnter(day, e) {
    const { onDayMouseEnter } = this.props;
    this.setState({ isHovered: true });
    onDayMouseEnter(day, e);
  }

  onDayMouseLeave(day, e) {
    const { onDayMouseLeave } = this.props;
    this.setState({ isHovered: false });
    onDayMouseLeave(day, e);
  }

  onKeyDown(day, e) {
    const {
      onDayClick,
    } = this.props;

    const { key } = e;
    if (key === 'Enter' || key === ' ') {
      onDayClick(day, e);
    }
  }

  setButtonRef(ref) {
    this.buttonRef = ref;
  }

  render() {
    const {
      day,
      ariaLabelFormat,
      daySize,
      isOutsideDay,
      modifiers,
      tabIndex,
      renderDayContents,
      styles,
      phrases,

      defaultStyles: defaultStylesWithHover,
      outsideStyles: outsideStylesWithHover,
      todayStyles: todayStylesWithHover,
      firstDayOfWeekStyles: firstDayOfWeekStylesWithHover,
      lastDayOfWeekStyles: lastDayOfWeekStylesWithHover,
      highlightedCalendarStyles: highlightedCalendarStylesWithHover,
      blockedMinNightsStyles: blockedMinNightsStylesWithHover,
      blockedCalendarStyles: blockedCalendarStylesWithHover,
      blockedOutOfRangeStyles: blockedOutOfRangeStylesWithHover,
      hoveredSpanStyles: hoveredSpanStylesWithHover,
      selectedSpanStyles: selectedSpanStylesWithHover,
      lastInRangeStyles: lastInRangeStylesWithHover,
      selectedStyles: selectedStylesWithHover,
      selectedStartStyles: selectedStartStylesWithHover,
      selectedEndStyles: selectedEndStylesWithHover,
      afterHoveredStartStyles: afterHoveredStartStylesWithHover,
    } = this.props;

    const { isHovered } = this.state;

    if (!day) return <td />;

    const {
      daySizeStyles,
      useDefaultCursor,
      selected,
      hoveredSpan,
      isOutsideRange,
      ariaLabel,
    } = getCalendarDaySettings(day, ariaLabelFormat, daySize, modifiers, phrases);

    return (
      <td
        {...css(
          styles.CalendarDay,
          useDefaultCursor && styles.CalendarDay__defaultCursor,
          daySizeStyles,
          getStyles(defaultStylesWithHover, isHovered),
          isOutsideDay && getStyles(outsideStylesWithHover, isHovered),
          modifiers.has('today') && getStyles(todayStylesWithHover, isHovered),
          modifiers.has('first-day-of-week') && getStyles(firstDayOfWeekStylesWithHover, isHovered),
          modifiers.has('last-day-of-week') && getStyles(lastDayOfWeekStylesWithHover, isHovered),
          modifiers.has('highlighted-calendar') && getStyles(highlightedCalendarStylesWithHover, isHovered),
          modifiers.has('blocked-minimum-nights') && getStyles(blockedMinNightsStylesWithHover, isHovered),
          modifiers.has('blocked-calendar') && getStyles(blockedCalendarStylesWithHover, isHovered),
          hoveredSpan && getStyles(hoveredSpanStylesWithHover, isHovered),
          modifiers.has('after-hovered-start') && getStyles(afterHoveredStartStylesWithHover, isHovered),
          modifiers.has('selected-span') && getStyles(selectedSpanStylesWithHover, isHovered),
          modifiers.has('last-in-range') && getStyles(lastInRangeStylesWithHover, isHovered),
          selected && getStyles(selectedStylesWithHover, isHovered),
          modifiers.has('selected-start') && getStyles(selectedStartStylesWithHover, isHovered),
          modifiers.has('selected-end') && getStyles(selectedEndStylesWithHover, isHovered),
          isOutsideRange && getStyles(blockedOutOfRangeStylesWithHover, isHovered),
        )}
        role="button"
        ref={this.setButtonRef}
        aria-label={ariaLabel}
        onMouseEnter={(e) => { this.onDayMouseEnter(day, e); }}
        onMouseLeave={(e) => { this.onDayMouseLeave(day, e); }}
        onMouseUp={(e) => { e.currentTarget.blur(); }}
        onClick={(e) => { this.onDayClick(day, e); }}
        onKeyDown={(e) => { this.onKeyDown(day, e); }}
        tabIndex={tabIndex}
      >

        {renderDayContents ? renderDayContents(day, modifiers) : day.format('D')}
      </td>
    );
  }
}

CustomizableCalendarDay.propTypes = propTypes;
CustomizableCalendarDay.defaultProps = defaultProps;

export { CustomizableCalendarDay as PureCustomizableCalendarDay };
export default withStyles(({ reactDates: { font } }) => ({
  CalendarDay: {
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: font.size,
    textAlign: 'center',

    ':active': {
      outline: 0,
    },
  },

  CalendarDay__defaultCursor: {
    cursor: 'default',
  },
}))(CustomizableCalendarDay);