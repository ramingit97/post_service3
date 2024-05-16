import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './ormconfig';
import { UserModule } from './features/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokensModule } from './features/tokens/tokens.module';
import { ReservModule } from './features/reservations/reserv.module';
import { RestarauntModule } from './features/restaraunt/restaraunt.module';
import { TestModule } from './features/test/test.module';
import { AuthModule } from './features/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
  
      isGlobal:true,
      envFilePath:'./.development.env'
    }),
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:()=>dataSource.options
    }),
    UserModule,
    TokensModule,
    RestarauntModule,
    ReservModule,
  ],
  controllers: [AppController],
  providers: [AppService
  ],
})
export class AppModule {}
