const os = require('os');
const ifaces = os.networkInterfaces();

process.env.ip = ifaces['Wi-Fi'][1].address;
