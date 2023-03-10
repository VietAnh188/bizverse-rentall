// General
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// GraphQL
import { graphql, gql, compose } from 'react-apollo';

// Redux Form
import { Field, reduxForm } from 'redux-form';

// Redux
import { connect } from 'react-redux';

// Translation
import { injectIntl, FormattedMessage } from 'react-intl';
import cx from 'classnames';

// Locale
import messages from '../../locale/messages';

import { openAddWishListGroupModal } from '../../actions/WishList/modalActions';

// GraphQL
import getAllWishListGroupQuery from './getAllWishListGroup.graphql';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
    Grid,
    Button,
    Row,
    Col
} from 'react-bootstrap';
import s from './WishLists.css';
import bt from '../../components/commonStyle.css';

// Components
import Loader from '../../components/Loader';
import WishListGroupItem from './WishListGroupItem';
import WishListGroupModal from './WishListGroupModal';

class WishListComponent extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getAllWishListGroup: PropTypes.any
        }),
    };

    static defaultProps = {
        data: {
            loading: true
        },
    };
    render() {
        const { profileId } = this.props;
        const { data: { loading, getAllWishListGroup } } = this.props;
        const { formatMessage } = this.props.intl;
        const { openAddWishListGroupModal } = this.props;
        const itemInPage = 6;
        return (
            <div>
                <WishListGroupModal actionType={'add'} />
                <Grid fluid>
                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.landingContent, s.noPadding, s.marginTop)}>
                        <Col xs={12} sm={8} md={8} lg={8}>
                            <h2 className={s.landingTitle}><FormattedMessage {...messages.wishLists} /></h2>
                        </Col>
                        <Col xs={12} sm={4} md={4} lg={4}>
                            <button className={cx(s.button, bt.btnLarge, s.pullRight, s.noMargin, s.smPosition, 'shareIconRtl')}
                                onClick={() => openAddWishListGroupModal({}, 'AddWishListGroupForm')}>
                                <FormattedMessage {...messages.createButton} />
                            </button>
                        </Col>
                        {
                            loading && <Col xs={12} sm={12} md={12} lg={12} >
                                <Loader type="text" />
                            </Col>
                        }
                        {
                            !loading && getAllWishListGroup && getAllWishListGroup.status == 'success' && <Col xs={12} sm={12} md={12} lg={12} className={s.smTop4}>
                                {
                                    getAllWishListGroup.count > 0 && getAllWishListGroup.wishListGroupData && getAllWishListGroup.wishListGroupData.length > 0 && <div className={s.landingContentTitle}>
                                        <FormattedMessage {...messages.yourLists} />
                                        <label className={cx(s.pullRight, 'shareIconRtl')}>
                                            <small>{getAllWishListGroup.count} {getAllWishListGroup.count > 1 ? formatMessage(messages.lists) : formatMessage(messages.list)}</small>
                                        </label>
                                    </div>
                                }
                                {
                                    getAllWishListGroup.wishListGroupData && getAllWishListGroup.wishListGroupData.length > 0 && getAllWishListGroup.count > 0 && <Row>
                                        {
                                            getAllWishListGroup.wishListGroupData.map((item, index) => {
                                                return (
                                                    <Col lg={4} md={4} sm={4} xs={12} key={index}>
                                                        <WishListGroupItem data={item} />
                                                    </Col>
                                                )
                                            })
                                        }
                                    </Row>
                                }
                                {
                                    getAllWishListGroup.wishListGroupData && getAllWishListGroup.wishListGroupData.length == 0 && getAllWishListGroup.count == 0 && <Row>
                                        <Col lg={12} md={12} sm={12} xs={12}>
                                            <h3 className={s.landingContentTitle}>
                                                <FormattedMessage {...messages.noWishlists} />
                                            </h3>
                                        </Col>
                                    </Row>
                                }
                            </Col>
                        }
                    </Col>
                </Grid>
            </div>
        )
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    openAddWishListGroupModal
};

export default compose(
    injectIntl,
    withStyles(s, bt),
    connect(mapState, mapDispatch),
    graphql(getAllWishListGroupQuery,
        {
            options: (props) => ({
                variables: {
                    profileId: props.profileId
                },
                fetchPolicy: 'network-only',
            })
        }
    )
)(WishListComponent);
