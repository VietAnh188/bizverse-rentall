import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import CookiesDisclaimer from '../CookiesDisclaimer';
import cx from 'classnames';

class UserLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { backgroundPositionY } = this.props;

    return (
      <div className={s.overFlowHidden}>
        <Header />
        <div className={cx(s.paddingTop, s.userLayoutContent, s.imagesBg)}>
          <Breadcrumb />
          {this.props.children}
        </div>
        <Footer />
        <CookiesDisclaimer />
      </div>
    );
  }
}

export default withStyles(s)(UserLayout);
