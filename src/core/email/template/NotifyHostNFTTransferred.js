import React from "react";
import PropTypes from "prop-types";
import Layout from "../layouts/Layout";
import Header from "../modules/Header";
import Body from "../modules/Body";
import Footer from "../modules/Footer";
import EmptySpace from "../modules/EmptySpace";
import { url, sitename } from "../../../config";
import { MARKETPLACE_DETAIL_URL } from '../helpers/config'
class NotifyHostNFTTransferred extends React.Component {

    render() {
        const buttonStyle = {
            margin: 0,
            fontFamily: "Arial",
            borderRadius: "2px",
            textAlign: "center",
            verticalAlign: "middle",
            fontWeight: "normal",
            fontSize: "18px",
            whiteSpace: "nowrap",
            background: "#ffffff",
            borderTopWidth: "1px",
            marginLeft: "8px",
            marginRight: "8px",
            border: 0,
            backgroundColor: "transparent",
            textDecoration: "underline",
        };

        const textStyle = {
            color: "#484848",
            backgroundColor: "#F7F7F7",
            fontFamily: "Arial",
            fontSize: "16px",
            padding: "35px",
        };

        const linkText = {
            color: "#ff5a5f",
            fontSize: "18px",
            textDecoration: "none",
            cursor: "pointer",
        };

        const {
            content: { userName, from, to, logo, nft, fromInfo, toInfo },
        } = this.props;

        return (
            <Layout>
                <Header color="#FF5A5F" backgroundColor="#F7F7F7" logo={logo} />
                <Body textStyle={textStyle}>
                    <div>Hi {userName},</div>
                    <EmptySpace height={20} />
                    <div>New transferring of your NFT</div>
                    <EmptySpace height={40} />
                    <div>
                        NFT {nft.name} have been transferred from {fromInfo && fromInfo.displayName ? `user ${fromInfo.displayName} (wallet: ${from}))`: from} to {toInfo && toInfo.displayName ? `user ${toInfo.displayName} (wallet: ${to}))`: to}
                    </div>
                    <EmptySpace height={40} />
                    <EmptySpace height={20} />
                    <div>
                        Check in on {nft.checkIn} and check out on {nft.checkOut}
                    </div>
                    <EmptySpace height={40} />
                    <div>
                        View details about this items
                        <a style={buttonStyle} href={MARKETPLACE_DETAIL_URL + nft.id}>
                            here
                        </a>
                    </div>
                    <EmptySpace height={40} />
                    <div>
                    <EmptySpace height={20} />
                        Thanks and best regards!<br />
                        Bizverse Team.
                    </div>
                </Body>
                <Footer />
                <EmptySpace height={20} />
            </Layout>
        );
    }
}

export default NotifyHostNFTTransferred;
