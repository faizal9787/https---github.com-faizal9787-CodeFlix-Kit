import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// FIX: Removed '../src/' because index.ts is already INSIDE src.
// Also ensures it matches your file name: supportDeskRoutes.js
import supportRoutes from './modules/support/routes/supportDeskRoutes.js';

// Load Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// 1. GLOBAL MIDDLEWARES
app.use(helmet()); 
app.use(cors());   
app.use(morgan('dev')); 
app.use(express.json()); 

// 2. HEALTH CHECK
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', service: 'Codeflix Support Desk' });
});

// 3. MODULE ROUTES
app.use('/api/v1/support', supportRoutes);

// 4. GLOBAL ERROR HANDLER
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error('[Global Error]:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong on the server',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 5. SERVER START
app.listen(PORT, () => {
  console.log('-------------------------------------------');
  console.log(`🚀 Server running on: http://localhost:${PORT}`);
  console.log(`📂 Module: Support Desk (Port 8001)`);
  console.log('-------------------------------------------');
});