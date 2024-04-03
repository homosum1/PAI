import express, { Request, Response } from 'express';
import { engine } from 'express-handlebars';
import path from 'path';

import { sequelize } from './database';
import AuctionRouter from './Auction/AuctionRouter';

const app = express();

app.use(express.static('public'));

const hbs = engine({
    helpers: {
      formatDate: (date: Date): string => {
        if (!date) return '';
        return date.toLocaleString();
      }
    },
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    }
});

app.engine('handlebars', hbs);
app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, '..', 'src', 'views'));


sequelize.sync().then(() => {
    console.log('DB running ✅');
}).catch(err => {
    console.error('Unable to sync database 💥', err);
});


app.get('/', (req: Request, res: Response) => {
    res.render('home'); 
});

app.use('/auctions', AuctionRouter);  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT} ✅`));
