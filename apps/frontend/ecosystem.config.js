const PROC_NAME = process.env.PROC_NAME;

if(!PROC_NAME) {
    throw new Error('PROC_NAME is required');
}

const dotenv = require('dotenv');

const env = dotenv.config({
    path: './.env.local',
}).parsed ?? {};

const appMode = env.APP_MODE;

/**
 * @type {{apps: import('pm2').StartOptions[]}}
 */
module.exports = {
    apps: [{
        name: PROC_NAME,
        instances: 1,
        autorestart: true,
        script: '../../node_modules/next/dist/bin/next',
        args: 'start',
        cwd: '.',
        env_local: {
            APP_ENV: 'local',
        },
        env_development: {
            APP_ENV: 'dev',
        },
        env_production: {
            APP_ENV: 'prod',
        },
        node_args: appMode === 'debug' ? '--inspect=9090' : undefined,
    }],
};
