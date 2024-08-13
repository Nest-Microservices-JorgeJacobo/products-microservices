import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const logger = new Logger('Main');

  // const app = await NestFactory.create(AppModule);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   })
  //  );

  // await app.listen(envs.port);
  // logger.log(`App running on port ${envs.port}`)

  logger.log(envs.natServers);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      // transport: Transport.TCP,
      transport: Transport.NATS,
      options: {
        // port: envs.port
        servers: envs.natServers
      }
    },
  );

  await app.listen();
  logger.log(`Products microservices running on port ${envs.port}`);

}
bootstrap();
