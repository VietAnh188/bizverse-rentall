
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Translation
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ViewType.css';
import {
  Button
} from 'react-bootstrap';
import cx from 'classnames';

// Redux Form
import { Field, reduxForm, formValueSelector, change, submit as submitForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Locale
import messages from '../../../../locale/messages';

// Submit
import submit from '../../SearchForm/submit';

// Import action
import { changeViewType } from '../../../../actions/getSearchResults';

// Import constant
import { VIEW_TYPES } from '../../../../constants/viewTypes';

// Icons
import IconDown from 'react-icons/lib/fa/chevron-down';
import IconUp from 'react-icons/lib/fa/chevron-up';

// Helpers
import getParam from '../../../../helpers/getParam';

// Redirect
import history from '../../../../core/history';

class ViewType extends Component {

  static propTypes = {
    className: PropTypes.any,
    handleTabToggle: PropTypes.any,
    isExpand: PropTypes.bool
  };

  static defaultProps = {
    isExpand: false,
    fieldsSettingsData: {
      viewType: '',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
        site: 'all',
        viewType: this.props.viewType,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleSubmit = (param) => {
    const { site } = this.state;

    const { handleTabToggle, isExpand } = this.props;
    const { submitForm, changeViewType } = this.props;
    
    submitForm('SearchForm');
    handleTabToggle('viewType', !isExpand)
    const newUrl = window.location.search.replace(getParam('viewtype', 'all'), site);
    history.push(`/s${newUrl}`);
    this.setState({isInit: true, viewType: getParam('viewtype', 'all')})
    changeViewType(param)
  }

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }

  setBtnWrapperRef = (node) => {
    this.btnWrapperRef = node;
  }

  handleClickOutside = (event) => {
    const { handleTabToggle, isExpand } = this.props;
    const { change, submitForm } = this.props;
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      change('currentPage', 1);
      submitForm('SearchForm');
      if (this.btnWrapperRef && !this.btnWrapperRef.contains(event.target)) {
        handleTabToggle('viewType', !isExpand)
      }
    }
  };
  
  checkboxHorizontalGroup = ({ input }) => {

    const VIEW_TYPES_ARRAY = [
      {
        id: 1,
        name: <FormattedMessage {...messages.viewTypeAll} />,
        value: VIEW_TYPES.all,
      },
      {
        id: 2,
        name: <FormattedMessage {...messages.viewTypeRecommended} />,
        value: VIEW_TYPES.recommended,
      },
      {
        id: 3,
        name: <FormattedMessage {...messages.viewTypeMostViewed} />,
        value: VIEW_TYPES.mostViewed,
      },
    ];

    const { viewType } = this.props;
 
    return (
      <div className={cx(s.displayTable)}>
      {
        VIEW_TYPES_ARRAY.map(item => {
        return (
          <div className={cx(s.displayTableRow)} key = {item.id} >
            <div 
            className={cx(s.displayTableCell, s.padding4)}
            onChange={e => this.setState({site: e.target.value})}
            value = {input.value}
            >
              <input
                onChange={(e) => {
                  input.onChange(e.target.value)
                }}
                type="radio" 
                name='radioViewType'
                className={s.inputRadio}
                value={item.value}
                checked = {viewType === item.value}
                />
            </div>
            <div className={cx(s.displayTableCell, s.captionTitle, s.padding4, 'NhNameRtl')}>
              <lable>{item.name}</lable>
            </div>
        </div>
          );
      })
      }
      </div>
    )
  };

  render() {
    const { site } = this.state;
    const { className, handleTabToggle, isExpand } = this.props;
    const { formatMessage } = this.props.intl;

    let buttonLabel = formatMessage(messages.viewType);

    return (
      <div className={className}>
        <div ref={this.setBtnWrapperRef}>
          <button
            className={cx(s.btnSearchActive, s.btn, s.responsiveFontsize, s.searchBtn)}
            onClick={() => handleTabToggle('viewType', !isExpand)}>
              {buttonLabel}
              {isExpand ? <IconUp className={cx(s.searchArrow, 'searchArrowAR')} /> : <IconDown className={cx(s.searchArrow, 'searchArrowAR')} />}
          </button>
        </div>
        {
          isExpand && (
            <div 
              className={cx(s.searchFilterPopover, 'searchFilterPopoverRtl', 'bizverse-box-secondary')} 
              ref={this.setWrapperRef}
              >
              <div className={s.searchFilterPopoverContent}>
                <Field
                  name="viewType"
                  component={this.checkboxHorizontalGroup}
                  />
                <div className={cx(s.searchFilterPopoverFooter, s.displayTable)}>
                  <div className={cx('text-right', s.displayTableCell, 'textAlignLeftRtl')}>
                    <Button
                      bsStyle="link"
                      className={cx(s.btnLink, s.applyBtn)}
                      onClick={() => this.handleSubmit(site)}>
                        <FormattedMessage {...messages.apply} />
                    </Button>
                  </div>
                </div>
              </div> 
            </div>
        )
        }
    </div>
    );
  }
}

ViewType = reduxForm({
  form: 'SearchForm', // a unique name for this form
  onSubmit: submit,
  destroyOnUnmount: false,
})(ViewType);

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  fieldsSettingsData: state.listingFields.data,
  viewType: selector(state, 'viewType'),
});

const mapDispatch = {
  change,
  submitForm,
  changeViewType
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(ViewType)));