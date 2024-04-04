import { Request, Response } from 'express';
import { Auction, AuctionInterface } from '../Auction/AuctionModel';
import { Offer } from './OfferModel';

export const showSubmitOfferForm = async (req: Request, res: Response) => {
    try {
      const auctionId = req.params.id;
      const auction = await Auction.findByPk(auctionId) as AuctionInterface | null ;
  
      if (auction && new Date(auction.endDateTime) > new Date()) {
        res.render('submitAuctionOffer', { auction });
      } else {
        res.status(404).send('Nie znaleziono aukcji, lub aukcja została zakończona');
      }
    } catch (error) {
      res.status(500).send('Ups, Błąd serwera');
    }
};


export const submitOffer = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { name, value } = req.body;
    const auctionId = req.params.id;

    const auction = await Auction.findByPk(auctionId) as AuctionInterface | null ;

    if (auction && new Date(auction.endDateTime) > new Date()) {

      const newOffer = await Offer.create({
        name,
        value,
        auctionId
      });

      res.send('Oferta została zgłoszona prawidłowo!');
    }
    else {
      res.send('Oferta nie istnieje lub wygasła');
    }
  } catch (error) {
    console.log("error:");
    console.log(error);
    res.status(500).send('Błąd podczas składania oferty');
  }
};