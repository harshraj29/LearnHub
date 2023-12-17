import { configDotenv } from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import express from 'express';
import connectToDb from './config/db.config.js';
import errorMiddleware from './middleware/error.middleware.js';
import userRoutes from './routes/user.routes.js'; 
import courseRoutes from './routes/course.routes.js'; 
import paymentRoutes from './routes/payment.routes.js';
import miscellaneousRoutes from './routes/miscellaneous.routes.js';

const app = express();

const allowedOrigin = 'https://learn-hub-learning-management-system-c603u9nhl-harshraj29.vercel.app/';


configDotenv();

// Allow all origins for development, replace with your production URL
const allowedOrigins = process.env.CLIENT_URL || 'https://learn-hub-learning-management-system-c603u9nhl-harshraj29.vercel.app/courses';

app.use(cors({
    origin: process.env.NODE_ENV === 'development' ? '*' : 'https://learn-hub-learning-management-system-c603u9nhl-harshraj29.vercel.app/',
    credentials: true,
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// Your routes
app.use("/user", userRoutes);

app.use('/courses', courseRoutes)

app.use('/payments', paymentRoutes)

app.use('/', miscellaneousRoutes)

// Handle 404 errors
app.all('*', (req, res) => {
  res.status(404).send('OOPS!! 404 page not found');
});

// Error middleware
app.use(errorMiddleware);

// Initialize the database
connectToDb();

export default app;
