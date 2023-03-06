import moment from 'moment';
import DataType from 'sequelize';
import Model from '../sequelize';

const NFT = Model.define('NFT', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },

    listId: {
        type: DataType.INTEGER
    },

    hostId: {
        type: DataType.STRING
    },
    
    state: {
        type:  DataType.ENUM('expired', 'active', 'cancelled'),
        defaultValue: 'active',
    },

    address: {
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
    
    thumbnail: {
        type: DataType.STRING
    },

    roomType: {
        type: DataType.STRING,
        allowNull: false
    },

    name: {
        type:  DataType.STRING
    },

    country: {
        type: DataType.STRING,
        allowNull: false
    },

    guestNumber: {
        type: DataType.INTEGER,
        allowNull: false
    },

    beds: {
        type: DataType.INTEGER,
        allowNull: false
    },

    detail: {
        type: DataType.TEXT
    },

    city: {
        type: DataType.STRING,
        allowNull: false
    },

    houseType: {
        type: DataType.STRING,
        allowNull: false
    },

    uri: {
        type: DataType.STRING
    },

    owner: {
        type: DataType.STRING
    },

    originalOwner: {
        type: DataType.STRING
    },

    mintingPrice: {
        type: DataType.FLOAT
    },

    lastPrice: {
        type: DataType.FLOAT
    },

    currentPrice: {
        type: DataType.FLOAT
    },

    nftState: {
        type: DataType.STRING
    },

    canBooking: {
        type: DataType.BOOLEAN,
        defaultValue: '0'
    },

    isDeleted: {
        type: DataType.BOOLEAN,
        defaultValue: '0'
    },
    isSelling: {
        type: DataType.BOOLEAN,
        defaultValue: '0'
    },
    isOnMarketplace: {
        type: DataType.BOOLEAN,
        defaultValue: '0'
    },
    tokenId: {
        type: DataType.INTEGER
    },
    reservationId: {
        type: DataType.INTEGER
    },
    requestUser: {
        type: DataType.STRING
    },
    claimWallet: {
        type: DataType.STRING
    },
    currency: {
        type: DataType.STRING
    },
    isHostMinted: {
        type: DataType.BOOLEAN,
        defaultValue: '0'
    },
    offerId: {
        type: DataType.INTEGER
    },
    inTransaction: {
        type: DataType.BOOLEAN,
        defaultValue: '0'
    },
    inTransactionAt: {
        type: DataType.DATE
    },
    deletedByReservationId: {
        type: DataType.INTEGER
    },
    isTrending: {
        type: DataType.BOOLEAN,
        defaultValue: '0'
    },
    sellAt: {
      type: DataType.DATE,
      allowNull: true,
      get: function() {
        return this.getDataValue('sellAt') ? moment.utc(this.getDataValue('sellAt')).format('YYYY-MM-DD') : null;
      } 
    },
    isMinting: {
        type: DataType.BOOLEAN,
        defaultValue: '0'
    },
    mintedAt: {
        type: DataType.DATE,
    },
});

export default NFT; 
