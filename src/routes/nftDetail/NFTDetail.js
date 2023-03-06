import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React, { Component } from 'react';

import { connect } from 'react-redux';

import { getNFT } from '../../actions/nft/getNFT';

import { getList } from '../../selector/general';

import NotFound from '../notFound/NotFound';
import NFTItemDetail from './NFTItemDetail';
import Loader from '../../components/Loader/Loader';

import moment from 'moment';

class NFTsDetail extends Component {
    componentWillMount(){
        const { getNFT, nftId }= this.props;

        getNFT(nftId);
    }
    
    render() {
        const { getNFTById, isLoading, nftId } = this.props;
        const nft = getNFTById(nftId);

        if (isLoading) {
            return <Loader type="fulltext" />
        }

        if (!nft) {
            return <NotFound />
        }

        return <NFTItemDetail nft = {nft}/>
    }
}
const mapState = (state) => ({
    getNFTById: id => state.nft.byId[id],
    isLoading: state.nft.isLoading,
});
const mapDispatch = {
    getNFT,
};
export default connect(mapState, mapDispatch)(NFTsDetail);