import express from 'express';
import { getActiveAuctions, getInactiveAuctions, addAuction, getAuction, getInactiveAuction } from './AuctionController'; 

const router = express.Router();


router.get('/active-auctions', getActiveAuctions);
router.get('/inactive-auctions', getInactiveAuctions);

router.post('/add-auction-form', addAuction);

router.get('/add-auction', (req, res) => {
    res.render('auctionCreator');
});

router.get('/auction/:id', getAuction);

router.get('/inactive-auction/:id', getInactiveAuction)

export default router;