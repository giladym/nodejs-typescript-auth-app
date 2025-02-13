import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import { ErrorHandlerMiddleware } from "./middlewares";
import router from "./api/index.api";



const app = express();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.use(ErrorHandlerMiddleware);

export default app;