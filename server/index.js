import express from 'express';
import cloudinary from 'cloudinary';
import * as dotenv from 'dotenv';
import cors from 'cors';
import listEndpoints from 'express-list-endpoints';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

// Configure Cloudinary
cloudinary.config({
  CLOUDINARY_CLOUD_NAME: 'dty0wscz8',
  CLOUDINARY_API_KEY: '863362814988132',
  CLOUDINARY_API_SECRET: 'rIf-Bh9dg3SzabMhXL-FU7NrW_o',
  secure: true,
});

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from DALL.E!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server started on port 8080'));
    console.table(listEndpoints(app));
  } catch (error) {
    console.log(error);
  }
};

startServer();
