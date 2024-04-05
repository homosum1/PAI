import express, { Request, Response, NextFunction } from 'express';
import { Op } from "sequelize";
import { Auction, AuctionInterface } from "./AuctionModel";
import { Offer, OfferInterface } from '../Offer/OfferModel';

export const getActiveAuctions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentDate = new Date();
        const activeAuctions = await Auction.findAll({
            where: {
                startDateTime: {
                    [Op.lte]: currentDate,
                },
                endDateTime: {
                    [Op.gte]: currentDate,
                }
            }
        });

        res.render('activeAuctions', { activeAuctions });
    } catch (error) {
        res.status(500).send('DB error');
    }

}

export const getInactiveAuctions = async (req: Request, res: Response, next: NextFunction) => {
  try {
      const currentDate = new Date();
      const inactiveAuctions = await Auction.findAll({
          where: {
              endDateTime: {
                  [Op.lt]: currentDate,
              }
          }
      });

      console.log(inactiveAuctions);
      res.render('inactiveAuctions', { inactiveAuctions });
  } catch (error) {
      res.status(500).send('DB error');
  }
};

export const getAuction = async (req: Request, res: Response) => {
    try {
      const auctionId = req.params.id;
      const auction = await Auction.findByPk(auctionId) as AuctionInterface | null;
  
      if (auction) {
        const isAuctionActive = auction.endDateTime > new Date();
        res.render('auction', { auction, isAuctionActive });
      } else {
        res.status(404).send('Nie znaleziono przetargu o podanym ID');
      }
    } catch (error) {
      res.status(500).send('DB error');
    }
};

export const getInactiveAuction = async (req: Request, res: Response) => {
  try {
      const auctionId = req.params.id;

      const auction = await Auction.findByPk(auctionId) as AuctionInterface | null;;

      if (!auction) {
          return res.status(404).send('Przetarg nie znaleziony');
      }

      if (new Date(auction.endDateTime) > new Date()) {
          return res.status(400).send('Przetarg jeszcze się nie zakończył');
      }

      const offers: OfferInterface[] = (await Offer.findAll({
        where: { auctionId: auction.id },
        order: [['value', 'ASC']]
      })).map(offer => offer.get({ plain: true }) as OfferInterface)

      const offersExceedBudget = offers.every(offer => offer.value > auction.maximumValue);

      res.render('inactiveAuction', { 
          auction,
          offers: offers,
          offersExceedBudget
      });

  } catch (error) {
      res.status(500).send('DB error');
  }
};


export const addAuction = async (req: Request, res: Response) => {
    try {
        const { title, organizationName, description, startDateTime, endDateTime, maximumValue } = req.body;

        await Auction.create({
            title,
            organizationName,
            description,
            startDateTime,
            endDateTime,
            maximumValue
        });

        const message = "Twoja oferta została dodana";
        res.render('message', { message });
    } catch (error) {
        res.status(500).send('DB error');
    }
};