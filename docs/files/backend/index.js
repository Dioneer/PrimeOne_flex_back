import dotenv from "dotenv";
import { router } from "./router/user-router.js";
import { Application } from "./router/application.js";
dotenv.config();

const app = new Application();

app.addRouter(router);
app.listen(process.env.PORT, () => { `Server work on port: ${process.env.PORT}` });


