import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { config } from './config/env';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { logger } from './middleware/logger';

// Route imports (will be added in later phases)
// import authRoutes from './routes/auth.routes';
// import portfolioRoutes from './routes/portfolio.routes';
// import projectRoutes from './routes/project.routes';
// import messageRoutes from './routes/message.routes';
// import uploadRoutes from './routes/upload.routes';

const app = express();

app.use(logger);

// ── Security ──────────────────────────────────────────────
app.use(helmet());

app.use(
  cors({
    origin: config.frontendUrl,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ── Parsing ───────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ── Logging ───────────────────────────────────────────────
if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// ── Health Check ──────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// ── API Routes ────────────────────────────────────────────
// app.use('/api/auth', authRoutes);
// app.use('/api/portfolio', portfolioRoutes);
// app.use('/api/projects', projectRoutes);
// app.use('/api/messages', messageRoutes);
// app.use('/api/upload', uploadRoutes);

// ── Error Handling ────────────────────────────────────────
app.use(notFound);
app.use(errorHandler);

export default app;
