const http = require('http');
const app = require('./index').default;

const port = process.env.PORT || 3000;

const server = http.createServer();

server.listen(port);