import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRouter from './routes/posts.js';
import {createPost} from './controllers/posts.js'
import { fileURLToPath } from 'url';
import { register } from './controllers/auth.js';
import { verfiyToken } from './middleware/auth.js';

/*CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginOpenerPolicy({ policy: 'same-origin' }));
app.use(morgan('common'));
app.use(bodyParser({ limit: '30mb', extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
// ROUTES WITH FILES
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verfiyToken, upload.single('picture'),createPost);
// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRouter);
// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server runing on PORT : $${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
