import { Rhythm, decorate, mount } from "@rhythmjs/rhythm";
import { appController } from "./app.controller";
import { appService } from "./app.service";

export const appModule = new Rhythm({ name: "app" })
  .register(decorate(() => ({ appService })))
  .use(mount(appController));
