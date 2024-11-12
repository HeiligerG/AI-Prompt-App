import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';
import config from '../config';

export const setupSecurity = (app) => {
    // Basic security headers
    app.use(helmet());

    // CORS configuration
    app.use(cors(config.cors));

    // Rate limiting
    const limiter = rateLimit(config.security.rateLimit);
    app.use('/api/', limiter);

    // Additional security measures
    app.disable('x-powered-by');
    app.use((req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'DENY');
        res.setHeader('Referrer-Policy', 'same-origin');
        next();
    });
};