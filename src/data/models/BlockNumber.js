import DataType from 'sequelize';
import Model from '../sequelize';

const BlockNumber = Model.define('BlockNumber', {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  blockNumber: {
    type: DataType.INTEGER,
    allowNull: false
  },
  
  type: {
    type: DataType.STRING,
    defaultValue: 'offers'
  },
  typeId: {
    type: DataType.STRING
  }
});

export default BlockNumber;
