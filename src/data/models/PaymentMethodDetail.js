import DataType from 'sequelize';
import Model from '../sequelize';

const PaymentMethodDetail = Model.define('PaymentMethodDetail', {
    id: {
        type: DataType.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    
      paymentId: {
        type: DataType.UUID,
        defaultValue: DataType.UUIDV1,
        allowNull: false
      },
      
      methodName: { 
          type: DataType.STRING, 
          allowNull: false 
      },

      paymentDetailType: { 
          type: DataType.STRING, 
          allowNull: false
      }
});

export default PaymentMethodDetail; 