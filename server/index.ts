import express from 'express';
import cors from 'cors';
import proxyRouter from './routes/proxy';
import liveRouter from './routes/live';
import channelsRouter from './routes/channels';
import contentRouter from './routes/content';
import corsProxyRouter from './routes/cors-proxy';
import authRouter from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/proxy', proxyRouter);
app.use('/api/live', liveRouter);
app.use('/api/channels', channelsRouter);
app.use('/api/content', contentRouter);
app.use('/api/cors-proxy', corsProxyRouter);
app.use('/api/auth', authRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
