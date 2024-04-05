import express from 'express';
import { getActiveAuctions, getInactiveAuctions, getAuction, getInactiveAuction } from './AuctionController'; 

const router = express.Router();


router.get('/active-auctions', getActiveAuctions);
router.get('/inactive-auctions', getInactiveAuctions);
router.get('/auction/:id', getAuction);
router.get('/inactive-auction/:id', getInactiveAuction)

export default router;