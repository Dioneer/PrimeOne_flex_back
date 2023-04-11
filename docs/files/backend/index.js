import dotenv from "dotenv";
import { router } from "./router/user-router.js";
import { Application } from "./router/application.js";
dotenv.config();
import *as handler from "./router/middleware.js";

const app = new Application();
app.addRouter(router);
app.use(handler.URLParse('http://localhost:5050'));
app.use(handler.parserJSON);
app.listen(process.env.PORT, () => { `Server work on port: ${process.env.PORT}` });


