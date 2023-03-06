import DataType from 'sequelize';
import Model from '../sequelize';

const VRLink = Model.define('VRLink', {
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
  title: {
    type: DataType.STRING
  },
  type: {
    type: DataType.STRING
  },
  url: {
    type: DataType.STRING
  },
  fullLink: {
    type: DataType.STRING
  }
});

export default VRLink;
