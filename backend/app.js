import express from 'express';
import cors from 'cors';
import path from 'path'
import { fileURLToPath } from "url";

const app = express();
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// CORS configuration
const allowedOrigins = ['http://localhost:5173']; // Add your production frontend domain here

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials (cookies, etc.)
}));

app.use(express.json({limit: "16kb"}));
app.use(bodyParser.json({limit: "16kb"}));

// Roter paths :-
import userRouter from './src/routers/userRouter.js';
import roomRouter from './src/routers/roomRouter.js';

// ROUTERS :-
app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname,"../frontend/dist")));

// Serve index.html for any unknown paths (for client-side routing)
app.get('*', (req, res) => 
  res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
);

export { app };
