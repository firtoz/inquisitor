const dotenv = require("dotenv");
const path = require("path");
const cli = require('next/dist/cli/next-dev');

// language=file-reference
const localEnvPath = path.join(__dirname, '../.env.local');

const localEnv = dotenv.config({
    path: localEnvPath,
}).parsed ?? {};

cli.nextDev(['-p', localEnv.PORT || 3000]);
