const words = require("../data/data");
const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require("fs");

const protoFilePath = path.join(__dirname, "../resources/words.proto");
const protoPackageDefinition = protoLoader.loadSync(protoFilePath);
const protoPackageDescriptor = grpc.loadPackageDefinition(
  protoPackageDefinition
);
const protoPackage = protoPackageDescriptor;
const grpcServer = new grpc.Server();

const generateSingle = (call, callback) => {
  const generatedWord = words[Math.floor(Math.random() * words.length)];
  callback(null, { word: generatedWord });
};

const generateMultiple = (call, callback) => {
  const number = call.request.number ?? 1;
  const generatedWords = Array.from({ length: number }, () => ({
    word: words[Math.floor(Math.random() * words.length)],
  }));
  fs.writeFileSync(
    path.join(__dirname, "../generated/grpcOut"),
    protoPackageDefinition.WordGenerator.generateMultiple.responseSerialize({
      words: generatedWords,
    })
  );
  callback(null, { words: generatedWords });
};

grpcServer.addService(protoPackage.WordGenerator.service, {
  generateSingle,
  generateMultiple,
});

module.exports = (port) => {
  grpcServer.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      grpcServer.start();
      console.log("gRPC Server running at PORT:", port);
    }
  );
};
