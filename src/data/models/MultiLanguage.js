import DataType from 'sequelize';
import Model from '../sequelize';

const MultiLanguage = Model.define('MultiLanguage', {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataType.STRING,
    allowNull: false
  },
  typeId: {
    type: DataType.INTEGER,
    allowNull: false
  },
  language: {
    type: DataType.STRING,
    allowNull: false
  },
  translation: {
    type: DataType.STRING,
    allowNull: false
  },
});

export default MultiLanguage; 