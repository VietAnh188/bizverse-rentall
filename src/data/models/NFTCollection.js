import DataType from 'sequelize';
import Model from '../sequelize';

const NFTCollection = Model.define('NFTCollection', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataType.STRING,
        allowNull: false
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    description: {
        type: DataType.TEXT,
        allowNull: false
    },
    coverImage: {
        type: DataType.STRING,
    },
    avatar: {
        type: DataType.STRING,
    }
});

export default NFTCollection; 