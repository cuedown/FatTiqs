import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { requireAuth } from './middleware/auth';
import { apiLimiter } from './middleware/rate-limit';
import userRoutes from './routes/users';
import transactionRoutes from './routes/transactions';
import leaderboardRoutes from './routes/leaderboard';
import { healthCheck } from './routes/health';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security & logging
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
app.use(apiLimiter);

// Health check (public)
app.get('/health', healthCheck);

// Authenticated Routes
app.use('/api/users', requireAuth, userRoutes);
app.use('/api/transactions', requireAuth, transactionRoutes);
app.use('/api/leaderboard', requireAuth, leaderboardRoutes);

// OpenAPI docs
app.get('/api/docs', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'FatTips API',
      version: '0.1.0',
      description: 'REST API for FatTips Solana tipping bot',
    },
    paths: {
      '/health': {
        get: {
          summary: 'Health check',
          responses: {
            '200': {
              description: 'Server is healthy',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string' },
                      timestamp: { type: 'string', format: 'date-time' },
                      uptime: { type: 'number' },
                      version: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/users': {
        get: {
          summary: 'Get user profile',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': { description: 'User profile' },
            '401': { description: 'Unauthorized' },
          },
        },
      },
      '/api/transactions': {
        get: {
          summary: 'Get transaction history',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': { description: 'Transaction list' },
            '401': { description: 'Unauthorized' },
          },
        },
      },
      '/api/leaderboard': {
        get: {
          summary: 'Get leaderboard',
          security: [{ bearerAuth: [] }],
          responses: {
            '200': { description: 'Leaderboard data' },
            '401': { description: 'Unauthorized' },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  });
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});
