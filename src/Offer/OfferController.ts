import { Request, Response } from 'express';
import { Auction, AuctionInterface } from '../Auction/AuctionModel';
import { Offer } from './OfferModel';

export const showSubmitOfferForm = async (req: Request, res: Response) => {
    try {
      const auctionId = req.params.id;
      const auction = await Auction.findByPk(auctionId) as AuctionInterface | null ;
  
      if (auction && new Date(auction.endDateTime) > new Date()) {
        res.render('submitOffer', { auction });
      } else {
        res.status(404).send('Auction not found or already ended');
      }
    } catch (error) {
      res.status(500).send('DB error');
    }
  };

export const submitOffer = async (req: Request, res: Response) => {
  try {
    const { name, value } = req.body;
    const auctionId = req.params.id;

    const newOffer = await Offer.create({
      name,
      value,
      auctionId
    });

    res.send('Offer submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting offer');
  }
};