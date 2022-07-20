# A Simple API built using gRPC and Rest

## Getting Started

1. Run `npm init`
2. Run `npm start` to start both servers.
   > Rest Server runs on Port 8080 and gRPC Server runs on Port 9090 by default. This can be altered from the `src/index.js` file.

## Rest Endpoints

| Method | Endpoint             | Response                                            |
| ------ | -------------------- | --------------------------------------------------- |
| GET    | `/single`            | `{"word": "GORGE"}`                                 |
| GET    | `/multiple?number=2` | `{"words": [{"word": "SISSY"}, {"word": "PILOT"}]}` |

## gRPC Methods

| Service       | Method           | Message         | Deserialized Response                               |
| ------------- | ---------------- | --------------- | --------------------------------------------------- |
| WordGenerator | generateSingle   | `null`          | `{"word": "GORGE"}`                                 |
| WordGenerator | generateMultiple | `{"number": 2}` | `{"words": [{"word": "SISSY"}, {"word": "PILOT"}]}` |

## Comparison of File Size

To compare the file size of the 2 API responses, you can hit the `/multiple` Rest API and the `generateMultiple` gRPC API with the same queryParams/Message once and then run `ls -lh generated` from the terminal to see the output response file size.
