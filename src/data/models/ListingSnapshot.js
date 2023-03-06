import DataType from 'sequelize';
import Model from '../sequelize';

const ListingSnapshot = Model.define('ListingSnapshot', {
  id: {
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  originalListingId: {
    type: DataType.INTEGER,
    allowNull: false
  },

  userId: {
    type: DataType.UUID,
    allowNull: false
  },

  title: {
    type: DataType.STRING,
  },

  description: {
    type: DataType.TEXT,
  },

  residenceType: {
    type: DataType.STRING,
  },

  bedType: {
    type: DataType.STRING
  },

  roomType: { 
    type: DataType.STRING
  },

  houseType: { 
    type: DataType.STRING
  },

  bedrooms: {
    type: DataType.STRING,
  },

  beds: {
    type: DataType.INTEGER,
  },

  personCapacity: {
    type: DataType.INTEGER,
  },

  bathrooms: {
    type: DataType.FLOAT,
  },

  country: {
    type: DataType.STRING,
  },

  street: {
    type: DataType.STRING,
  },

  buildingName: {
    type: DataType.STRING,
  },

  city: {
    type: DataType.STRING,
  },

  state: {
    type: DataType.STRING,
  },

  zipcode: {
    type: DataType.STRING,
  },

  lat: {
    type: DataType.FLOAT,
  },

  lng: {
    type: DataType.FLOAT,
  },

  coverPhoto: {
    type: DataType.INTEGER,
  },

  isMapTouched: {
    type: DataType.BOOLEAN,
    defaultValue: false,
  },

  bookingType: {
    type: DataType.ENUM('request', 'instant'),
    defaultValue: 'instant',
    allowNull: false
  },

  isPublished: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  isReady: {
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },

  reviewsCount: {
    type: DataType.BOOLEAN,
    defaultValue: 0,
  },

  listApprovalStatus: {
    type: DataType.STRING,
    defaultValue: null,
  },

  bizverseLat: { 
      type: DataType.STRING,
      defaultValue: null,
  },

  bizverseLng: { 
      type: DataType.STRING,
      defaultValue: null,
  },

  bizverseLink360: {
      type: DataType.STRING,
      defaultValue:  null,
  },   

  hasBizverseLocation: {
    type: DataType.STRING,
  },

  vr360Data: {
    type: DataType.STRING
  },

  bizverseSpaceData: {
    type: DataType.STRING
  },

  isPayLater: {
    type: DataType.BOOLEAN,
    defaultValue: 0,
  },
  
  customRule: {
    type: DataType.STRING,
    defaultValue: ''
  }
});

export default ListingSnapshot;
