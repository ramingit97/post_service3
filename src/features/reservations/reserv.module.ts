import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsEntity } from './reserv.entity';
import {  ReservController } from './reserv.controller';
import { UserModule } from '@src/features/user/user.module';
import { TokensModule } from '@src/features/tokens/tokens.module';
import { ReservService } from './reserv.service';
import { ReservRepository } from './repo/reserv.repository';
import { AuthModule } from '../auth/auth.module';
@Module({
    imports:[
        AuthModule,
        TypeOrmModule.forFeature([ReservationsEntity]),
    ],
    providers: [
        ReservService,
        ReservRepository,
    ],
    controllers:[ReservController],
    exports: [ReservService],
})
export class ReservModule {}
