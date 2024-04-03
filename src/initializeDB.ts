import { Auction } from './Auction/AuctionModel';
import { sequelize } from './database';

interface AuctionDataSchema {
    title: string,
    description: string,
    organizationName: string,
    startDateTime: Date,
    endDateTime: Date,
    maximumValue: number
}

async function initializeDatabase() {
  try {

    await sequelize.sync({ force: true });

    const auctionData: AuctionDataSchema[] = [];

    const actionsCnt = 10;

    for (let i = 1; i <= actionsCnt; i++) {
        const days = (actionsCnt/2 - i) * 24 * 60 * 60 * 1000;

        await Auction.create({
          title: `nazwa aukcji ${i}`,
          description: `opis aukcji ${i}`,
          organizationName: `organizacja ${i}`,
          startDateTime: new Date(),
          endDateTime: new Date(new Date().getTime() + days),
          maximumValue: 100 * i
        });
    }

    console.log('DB Auction data initialized ✅ ');
  } catch (error) {
    console.error('Error initializing database Auction data:', error);
  }
}

initializeDatabase();
