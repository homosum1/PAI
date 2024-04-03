import express from 'express';
import { getActiveAuctions, getAuction } from './AuctionController'; 

const router = express.Router();


router.get('/active-auctions', getActiveAuctions);
router.get('/auction/:id', getAuction);

export default router;