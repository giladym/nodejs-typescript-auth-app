import { startServer } from "./src/loaders/server";

startServer()
    .then(() => {
        console.log('Server started successfully');
    })
    .catch((error) => {
        console.error('Error starting the server:', error);
    });