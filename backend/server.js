import express from 'express';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT || 3000;
import errorHandler from './middleware/errorHandler.js'
import connectDB from './config (db connect)/connection.db.js';
import userRoutes from './routes/User.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const options = {
    origin: 'http://localhost:5173',
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(options))
app.use(express.json());
app.use(cookieParser());

// connect to mongodb
const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();

        // Routes
        app.use('/api/users', userRoutes);

        app.get('/', (req, res) => {
            res.send('Home route');
        });

        // custom errors handling
        app.use(errorHandler);

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
