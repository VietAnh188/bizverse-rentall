import DataType from 'sequelize';
import Model from '../sequelize';

const ListingPermissionHistory = Model.define('ListingPermissionHistory', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    listId: {
        type: DataType.INTEGER,
        allowNull: false
    },

    userId: {
        type: DataType.UUID,
        allowNull: false
    },

    status: {
        type: DataType.STRING,
    },

    reason: {
        type: DataType.STRING,
    },

});

export default ListingPermissionHistory;  