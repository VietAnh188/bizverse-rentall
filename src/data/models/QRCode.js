import DataType from 'sequelize';
import Model from '../sequelize';

const QRCode = Model.define('QRCode', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    nftId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    owner: {
        type: DataType.STRING
    },

    code: { 
        type: DataType.STRING
    },

    userId: {
        type: DataType.UUID,
    },

    isAvailable: {
        type: DataType.BOOLEAN,
        defaultValue: true
    },

});

export default QRCode; 