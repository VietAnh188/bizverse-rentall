import DataType from 'sequelize';
import Model from '../sequelize';

const Minting = Model.define('Minting', {
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
    uri: {
        type: DataType.STRING
    },
    signedMessage: {
        type: DataType.STRING
    },
    mintingNonce: {
        type: DataType.INTEGER
    },
    delegatee: {
        type: DataType.STRING
    },
    recipient: {
        type: DataType.STRING
    },
    mut: {
        type: DataType.BOOLEAN
    }
});

export default Minting; 