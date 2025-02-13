import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { corsOptions } from "./config/corsOptions";
import ExpressMongoSanitize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { ErrorHandlerMiddleware } from "./middlewares";
import router from "./api/index.api";



const app = express();
app.use(morgan("dev"));


app.use(helmet()); // enhance security by setting various HTTP headers
    app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
    app.use(helmet.xssFilter());
    app.use(helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'trusted-cdn.com'"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    }));

app.use(ExpressMongoSanitize()); // sanitize user-supplied data to prevent MongoDB operator injection attacks
app.use(cors(corsOptions)); // enable Cross-Origin Resource Sharing (CORS), which allows controlled access to resources located on a different origin domain

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));\

app.use(express.json());
app.use("/api", router);
app.use(ErrorHandlerMiddleware);

export default app;