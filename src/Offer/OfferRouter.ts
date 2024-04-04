import express from 'express';
import { submitOffer, showSubmitOfferForm } from './OfferController';

const router = express.Router();


router.get('/show-submit-offer/:id', showSubmitOfferForm);
router.post('/submit-offer/:id', submitOffer);

export default router;