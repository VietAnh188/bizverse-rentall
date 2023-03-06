import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import CookiesDisclaimer from '../CookiesDisclaimer';
import cx from 'classnames';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    showBreadcrumb: PropTypes.bool
  };

  render() {
    const { showBreadcrumb = true } = this.props;
    return (
      <div>
        <Header />
        <div className={cx(s.paddingTop, s.imagesBg, s.heightContent)}>
          {showBreadcrumb && <Breadcrumb />}
          {this.props.children}
        </div>
        <div className={cx('hidden-xs hidden-sm')}>
          <Footer />
        </div>
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(Layout);
