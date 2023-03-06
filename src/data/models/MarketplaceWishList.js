import DataType from 'sequelize';
import Model from '../sequelize';

const MarketplaceWishList = Model.define('MarketplaceWishList', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataType.STRING
    },
    wallet: {
        type: DataType.STRING
    },
    nftId: {
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: 'NFT',
            key: 'id'
        }
    }
});

export default MarketplaceWishList; 