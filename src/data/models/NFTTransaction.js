import DataType from 'sequelize';
import Model from '../sequelize';

const NFTTransaction = Model.define('NFTTransaction', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    transactionId: {
        type: DataType.STRING,
        allowNull: false
    },
    nftId: {
        type: DataType.INTEGER,
        allowNull: false
    },
    status: {
        type: DataType.ENUM('created', 'closed', 'cancelled', 'replaced'),
        allowNull: false
    },
    from: {
        type: DataType.STRING,
        allowNull: false
    },
    price: {
        type: DataType.FLOAT,
    },
    hash: {
        type: DataType.STRING,
    },
    currency: {
        type: DataType.STRING,
    },
    transactionCreatedAt: {
        type: DataType.STRING,
    },
    to: {
        type: DataType.STRING,
    },
    blockNumber: {
        type: DataType.STRING
    },
    blockTimestamp: {
        type: DataType.STRING
    },
    offerId: {
        type: DataType.STRING
    },
    transferId: {
        type: DataType.STRING
    },
    transactionUpdatedAt: {
        type: DataType.STRING
    },
    transactionStatus: {
        type: DataType.ENUM('pending', 'success', 'fail')
    },
    transactionType: {
        type: DataType.ENUM('offer', 'transfer')
    },
});

export default NFTTransaction; 