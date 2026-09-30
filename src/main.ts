import { createServer } from "node:http";
import { getRequestListener } from "@rhythmjs/router/adapters/node";
import { appModule } from "./app.module";

const port = Number(process.env.PORT ?? 3000);

createServer(getRequestListener(appModule)).listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
