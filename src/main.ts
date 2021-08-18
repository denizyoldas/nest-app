import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './messages/adapters/redis-io.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  // app.useWebSocketAdapter(new RedisIoAdapter(app));

  const config = new DocumentBuilder()
    .setTitle('Kullanıcı API')
    .setDescription('Kullanıcı API deniyoruz.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
