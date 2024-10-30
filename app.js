// start app via Phusion Passenger
const path = require("node:path");

const nextPath = path.join(__dirname, "node_modules", ".bin", "next");

process.argv.length = 1;
process.argv.push(nextPath, "start");

require(nextPath);
