import { env } from "../config/enviroment";
import { Server, createServer } from 'http';
import mongooseLoader from "./mongoose";
import expressLoader from './express';
import { logger } from "../config/logger";

const exitHandler = (server: Server | null) => {
    if (server) {
      server.close(async () => {
        logger.info('Server closed');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };
  
const unExpectedErrorHandler = (server: Server) => {
    return function (error: Error) {
        logger.error(error);
        exitHandler(server);
    };
};

export async function startServer() {
    await mongooseLoader(); // Initialize MongoDB
    const app = expressLoader(); // Initialize Express app 
    const httpServer = createServer(app);      
    const port = env().port;

    const server: Server = httpServer.listen(port, () => {
        logger.info(`server listening on port ${port}`);
    });

    process.on('uncaughtException', unExpectedErrorHandler(server));
    process.on('unhandledRejection', unExpectedErrorHandler(server));
    process.on('SIGTERM', () => {
        logger.info('SIGTERM recieved');
        if (server) {
        server.close();
        }
    }); 
}