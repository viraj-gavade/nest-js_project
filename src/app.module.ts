import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';
import { ThrottlerModule , ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [UsersModule,
     DatabaseModule, 
     EmployeeModule,
     ThrottlerModule.forRoot([{
      name:'short',
      ttl:1000,
      limit:3,
     },
    {
      name:'long',
      ttl:60000,
      limit:100, 
    }])
    ],
  controllers: [AppController,{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
  providers: [AppService],
})
export class AppModule {}
