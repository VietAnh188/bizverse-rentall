import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import CookiesDisclaimer from '../CookiesDisclaimer';
import cx from 'classnames';

class NewListLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={s.overFlowHidden}>
        <Header />
        
        <div className={cx(s.paddingTop)}>
          <div className={s.newListContent}>
            <Breadcrumb />
            {this.props.children}
          </div>
          <div className={cx('hidden-xs hidden-sm')}>
            {/* <FooterToggle /> */}
            <Footer />
          </div>
        </div>
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(NewListLayout);
