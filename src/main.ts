import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  app.setGlobalPrefix("api/v1");
  app.enableCors();
  await app.listen(3003);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
