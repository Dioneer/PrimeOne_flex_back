import dotenv from "dotenv";
import { router } from "./router/user-router.js";
import { Application } from "./router/application.js";
dotenv.config();
import { parserJSON } from "./router/middleware.js";
import { URLParse } from "./router/middleware.js";

const app = new Application();
app.use(URLParse('http://localhost:5050'));
app.use(parserJSON);
app.addRouter(router);
app.listen(process.env.PORT, () => { `Server work on port: ${process.env.PORT}` });


