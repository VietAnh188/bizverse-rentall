import DataType from 'sequelize';
import Model from '../sequelize';

const NFTCollectionDetail = Model.define('NFTCollectionDetail', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    collectionId: {
        type: DataType.INTEGER,
        allowNull: false
    },
    nftId: {
        type: DataType.INTEGER,
        allowNull: false
    }
});

export default NFTCollectionDetail; 