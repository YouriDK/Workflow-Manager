import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // * app.use(isAuth) If i want every routes to use this
  await app.listen(5000);
}
bootstrap();
