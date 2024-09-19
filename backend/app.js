import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// CORS configuration
const allowedOrigins = ['http://localhost:5173', 'https://sailoo-chat-app.onrender.com'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(express.json({ limit: "16kb" }));
app.use(bodyParser.json({ limit: "16kb" }));

// Serve static files from the frontend dist directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// ROUTERS :-
// Roter paths :- import your routes
import userRouter from './src/routers/userRouter.js';
import roomRouter from './src/routers/roomRouter.js';

app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);

// Serve index.html for client-side routing (AFTER serving static assets)
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
);

export { app };
