import { NestFactory, Reflector } from '@nestjs/core';
import { RootModule } from './root.module';
import swaggerConfig from './config/swagger.config';
import { CustomJwtGuard } from './module/auth/guard/custom.jwt.guard';

async function bootstrap() {
  const app = await NestFactory.create(RootModule);
  // GLOBAL PREFIX
  app.setGlobalPrefix("/api/v1");

  // SWAGGER CONFIG
  swaggerConfig(app);

  // GUARDS
  const reflector = new Reflector()
  app.useGlobalGuards(new CustomJwtGuard(reflector));

  // PORT
  await app.listen(3000);
}
bootstrap();
