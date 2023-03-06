import DataType from 'sequelize';
import Model from '../sequelize';
import moment from 'moment';

const ReservationPreApproved = Model.define('ReservationPreApproved', 
{
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

    hostId: {
        type: DataType.STRING,
        allowNull: false
    },

    guestId: {
        type: DataType.STRING,
        allowNull: false
    },

    checkIn: {
        type: DataType.DATEONLY,
        allowNull: false,
        get: function(){
            return this.getDataValue('checkIn') ? moment.utc(this.getDataValue('checkIn')).format('YYYY-MM-DD') : null;
          }
    },

    checkOut: {
        type: DataType.DATEONLY,
        allowNull: false,
        get: function(){
            return this.getDataValue('checkOut') ? moment.utc(this.getDataValue('checkOut')).format('YYYY-MM-DD') : null;
          }
    },

    status: { 
        type: DataType.ENUM('pending', 'expired', 'completed'), allowNull: false, 
        defaultValue: 'pending'
    }
})

export default ReservationPreApproved; 