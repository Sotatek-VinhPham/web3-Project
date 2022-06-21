import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/users/user.module';

@Module({
  imports: [TypeOrmModule.forRoot({
      "type" : "mysql",
      "username" : "root",
      "password" : "1",
      "host" : "localhost",
      "port" : 3333,
      "database" : "wallet_of_user",
      "synchronize" : true,
      "entities" : ["dist/**/**/*.entity.js"]
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
