import app from './app';
import { connectDB } from './config/db';
import { config } from './config/env';

const start = async () => {
  // Start HTTP server first — health route works even before DB connects
  app.listen(config.port, () => {
    console.log(`🚀 Server running on http://localhost:${config.port} [${config.nodeEnv}]`);
  });

  // DB connection is non-blocking for the server itself
  try {
    await connectDB();
  } catch {
    console.warn('⚠️  Started without DB — fill in MONGODB_URI in .env');
  }
};

start();
