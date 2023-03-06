import DataType from 'sequelize';
import Model from '../sequelize';

const UserToken = Model.define('UserToken', {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },

  userId: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    allowNull: false
  },

  accessToken: {
    type: DataType.STRING,
    allowNull: false
  },

  tokenSavedAt: {
    type: DataType.DATE,
    allowNull: false
  },

  email: {
    type: DataType.STRING(255),
    validate: { isEmail: true },
    allowNull: false
  },
});

export default UserToken;
