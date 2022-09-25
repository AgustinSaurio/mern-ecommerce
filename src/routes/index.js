import express from 'express';
import Products from '../models/Product.js';
const router = express.Router();

router.get('/', async (req, res) => {
        try {
          const products = await Products.find();
          res.json(products)
        } catch (error) {
          console.log({ error });
          return res.render("error", { errorMessage: error.message });
        }
      })
router.get('/:id', async (req, res) => {
        try {
          const products = await Products.find({"_id": req.params['id']});
          res.json(products)
        } catch (error) {
          console.log({ error });
          return res.render("error", { errorMessage: error.message });
        }
      })

export default router;