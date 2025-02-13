
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { env } from "./src/config/enviroment";
import app from "./src/app";
import { connectToMongoDB } from "./src/config/mongoose";

connectToMongoDB();
const port = env().port;

app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Server running on port ${port}`);
    /* eslint-enable no-console */
});

app.use(bodyParser.json());
app.use(cookieParser());