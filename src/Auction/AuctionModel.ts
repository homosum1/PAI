import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

export interface AuctionInterface {
  id?: number;
  title: string;
  description: string;
  organizationName: string;
  startDateTime: Date;
  endDateTime: Date;
  maximumValue: number;
}

export const Auction = sequelize.define('Auction', {

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  
  organizationName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
  startDateTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  
  endDateTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  
  maximumValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {

});



