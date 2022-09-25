import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { connectDB } from './database.js';
import productRoutes from './routes/index.js'
import paymentRoutes from './routes/payment-routes.js'
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Db connection
connectDB();
// Settings 
app.set('port', process.env.PORT || 3000);
// Middlewares
app.use(morgan('dev'));
app.use(express.json());
// Routes
app.use('/api/products',productRoutes)
app.use('/payment',paymentRoutes)

// Static Files
app.use(express.static(path.join(__dirname, './public')));

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Port: ${app.get('port')}`);
});