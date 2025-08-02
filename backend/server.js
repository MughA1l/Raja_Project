import express from 'express';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const port = process.env.PORT || 3000;
import errorHandler from './middleware/errorHandler.js'
import connectDB from './config (db connect)/connection.db.js';
import userRoutes from './routes/User.route.js'

app.use(express.json());

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
