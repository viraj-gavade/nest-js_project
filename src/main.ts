import { NestFactory,HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionFilter } from './users/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,
 
  //   {
  //   bufferLogs:true
  // }
);
const { httpAdapter } = app.get(HttpAdapterHost);
app.useGlobalFilters(new AllExceptionFilter(httpAdapter))
  // app.useLogger(app.get(MyLoggerService))
  app.setGlobalPrefix('api')
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
