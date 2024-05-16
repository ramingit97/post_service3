import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@src/guards/auth.guard';
import { RolesGuard } from '@src/guards/role.guard';
import { TokenService } from '../tokens/token.service';
import { TokensModule } from '../tokens/tokens.module';


@Module({
    imports: [
      ConfigModule,
      TokensModule,
      JwtModule.registerAsync({
        imports:[ConfigModule],
        inject:[ConfigService],
        useFactory:(config:ConfigService)=>({
            secret:config.get<string>("JWT_SECRET")
        })
    })
    ],
    controllers: [],
    providers: [ AuthGuard,RolesGuard],
    exports: [AuthGuard, RolesGuard, JwtModule, ConfigModule,TokensModule],
  })
  export class AuthModule {}