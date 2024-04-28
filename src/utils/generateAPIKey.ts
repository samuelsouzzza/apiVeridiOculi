import crypto from 'crypto';

const generateAPIKey = () => crypto.randomBytes(32).toString('hex');

export const API_KEY = generateAPIKey();
