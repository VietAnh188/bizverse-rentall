import React, { PureComponent } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

// Styles
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './NFTsPagination.css';

// Images
import iconBack from "../../../public/SiteIcons/icon-back.png";
import iconNext from '../../../public/SiteIcons/icon-next.png';

// Locale
import messages from '../../locale/messages';

// Components
import { Button } from 'react-bootstrap';

class NFTsPagination extends PureComponent {
  render() {
    const { onClickNext, onClickBack, page = 1, limit = 8, total = 0 } = this.props;
    const maxPage = Math.floor(total / limit) + (total % limit > 0 ? 1 : 0);

    if (!maxPage) {
      return null;
    }

    return (
        <div className={s.paginationContainer}>
            <Button onClick={onClickBack} disabled={page === 1} className={cx(s.btnJump, s.btnBack)}>
                <img alt='icon back' src={iconBack} />
            </Button>
            <span className={cx(s.pageInformation, s.pageText)}>page</span>
            <div className={s.currentPage}>{page}</div>
            <span className={cx(s.pageInformation, s.pageTotalText)}>of {maxPage}</span>
            <Button onClick={onClickNext} disabled={page === maxPage} className={cx(s.btnJump, s.btnNext)}>
                <img alt='icon next' src={iconNext} />
            </Button>
        </div>
    );
  }
}

const mapState = (state) => ({
  total: state?.nft?.count || 0
});

const mapDispatch = {
  
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(NFTsPagination)));
