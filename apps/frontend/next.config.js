const dotenv = require("dotenv");
const path = require("path");

const envPath = path.join(__dirname, './.env');
const sharedEnvPath = path.join(__dirname, '../../.env.local');
const localEnvPath = path.join(__dirname, './.env.local');

const loadedEnv = dotenv.config({
    path: envPath,
}).parsed ?? {};

const sharedEnv = dotenv.config({
    path: sharedEnvPath,
}).parsed ?? {};

const localEnv = dotenv.config({
    path: localEnvPath,
}).parsed ?? {};

const publicEnv = Object.fromEntries(Object.entries({
    ...process.env,
    ...loadedEnv,
    ...sharedEnv,
    ...localEnv,
}).filter(([key]) => key.startsWith('NEXT_PUBLIC_')))

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ["ui", "common", "schemas"],
    env: {
        ...publicEnv,
    }
}

module.exports = nextConfig
