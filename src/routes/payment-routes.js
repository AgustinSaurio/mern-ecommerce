import express from 'express';
import { orderCreate, orderReady, orderCancel } from '../controllers/payment-controller.js'
const router = express.Router();

router.post('/create-order', orderCreate)

router.get('/payment-order', orderReady)

router.get('/cancel-order', orderCancel)

export default router;