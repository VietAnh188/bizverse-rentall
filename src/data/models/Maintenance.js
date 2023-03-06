import DataType from 'sequelize';
import Model from '../sequelize';

const Maintenance = Model.define('Maintenance', {

    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataType.ENUM(['app', 'web', 'marketplace']),
        allowNull: false,
    },
    active: {
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    startTime: {
        type: DataType.DATE,
    },
    endTime: {
        type: DataType.DATE,
    },
    description: {
        type: DataType.STRING,
        default: null   
    },

});

export default Maintenance;