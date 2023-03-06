import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../layouts/Layout';
import Header from '../modules/Header';
import Body from '../modules/Body';
import Footer from '../modules/Footer';
import EmptySpace from '../modules/EmptySpace';
import { url, sitename } from '../../../config';
import { MARKETPLACE_ACTIVITY_URL, MARKETPLACE_CLAIM_URL, MARKETPLACE_INVENTORY_URL} from '../helpers/config'
class BuyNFTEmail extends React.Component {

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
			color: '#484848',
			backgroundColor: '#F7F7F7',
			fontFamily: 'Arial',
			fontSize: '16px',
			padding: '35px'
		};

		const linkText = {
			color: '#ff5a5f',
			fontSize: '18px',
			textDecoration: 'none',
			cursor: 'pointer',
		}

		const { content: {  price, currency, logo, nft } } = this.props;

		return (
			<Layout>
				<Header color="#FF5A5F" backgroundColor="#F7F7F7" logo={logo} />
				<Body textStyle={textStyle}>
				<div>Congratulation!</div>
				<EmptySpace height={20} />
				<div>
				You have bought {nft.name} NFT successfully with price {price} {currency}.
				<EmptySpace height={20} />
				<div>
				Please see details at 
						<a style={buttonStyle} href={MARKETPLACE_INVENTORY_URL}>
						here
						</a> .
					</div>
					</div>
					<EmptySpace height={20} />
					<div>
					If you don't recognize this activity, please contact us immediately at help@bizverse.world
					<EmptySpace height={20} />
					Thanks and best regards!<br />
					Bizverse Team.
					</div>
					<EmptySpace height={40} />
				</Body>
				<Footer />
				<EmptySpace height={20} />
			</Layout>
		);
	}

}

export default BuyNFTEmail;