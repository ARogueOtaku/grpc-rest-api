const grpcServer = require("./grpc");
const restServer = require("./rest");

grpcServer(9090);
restServer(8080);
