import { serve } from "@rhythmjs/router/serve";
import { appModule } from "./app.module";

const port = Number(process.env.PORT ?? 3000);

const server = serve(appModule, { port });
console.log(`listening on ${server.url}`);
