const appMode = process.env.APP_MODE;
const PROC_NAME = process.env.PROC_NAME;

if(!PROC_NAME) {
  throw new Error('PROC_NAME is required');
}

/**
 * @type {{apps: import('pm2').StartOptions[]}}
 */
module.exports = {
  apps: [{
    name: PROC_NAME,
    script: "./lib/index.js",
    cwd: '.',
    env: {
      NODE_ENV: process.env.NODE_ENV,
    },
    node_args: appMode === 'debug' ? '--inspect=9090' : undefined,
  }],
};
