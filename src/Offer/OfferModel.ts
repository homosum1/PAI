import { DataTypes } from 'sequelize';
import { sequelize } from '../database'; 

export interface OfferInterface {
    id?: number;
    name: string;
    value: number; 
    createdAt?: Date;
    auctionId: number;
}

export const Offer = sequelize.define('Offer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  auctionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});