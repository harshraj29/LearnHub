import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { configDotenv } from 'dotenv';
import connectToDb from './config/db.config.js';
import errorMiddleware from './middleware/error.middleware.js';
import userRoutes from './routes/user.routes.js'; 
import courseRoutes from './routes/course.routes.js'; 
import paymentRoutes from './routes/payment.routes.js';
import miscellaneousRoutes from './routes/miscellaneous.routes.js';

const app = express();
configDotenv();

// Set allowed origins based on the environment
const allowedOrigins = process.env.CLIENT_URL ;

// CORS configuration
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Routes
app.use("/user", userRoutes);
app.use('/courses', courseRoutes);
app.use('/payments', paymentRoutes);
app.use('/', miscellaneousRoutes);

// Handle 404 errors
app.all('*', (req, res) => {
  res.status(404).send('OOPS!! 404 page not found');
});

// Error middleware
app.use(errorMiddleware);

// Initialize the database
connectToDb();

export default app;
