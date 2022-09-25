import express from 'express';
import Products from '../models/Product.js'
const router = express.Router();
import cors from 'cors';

let whitelist = ['https://agustinc-mern-ecommerce.herokuapp.com']
let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

router.get('/',cors(corsOptions), async (req, res) => {
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