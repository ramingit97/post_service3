import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from '@src/features/tokens/token.service';
import { TokenEntity } from '@src/features/tokens/token.entity';
import { UserRepository } from './repo/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports:[
        AuthModule,
        ConfigModule,
        TypeOrmModule.forFeature([UserEntity,TokenEntity]),
    ],
    providers: [UserService,TokenService,UserRepository],
    controllers:[UserController],
    exports:[UserService]
})
export class UserModule {}
