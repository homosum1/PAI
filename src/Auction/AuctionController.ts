import express, { Request, Response, NextFunction } from 'express';
import { Op } from "sequelize";
import { Auction, AuctionInterface } from "./AuctionModel";

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