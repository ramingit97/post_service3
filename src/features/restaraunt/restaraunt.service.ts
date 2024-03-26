import { Injectable, Scope } from '@nestjs/common';
import {  RestarauntRepository } from './repo/restaraunt.repository';
import { RestarauntEntity } from './restaraunt.entity';
import { IRestaraunt } from './restaraunt.interface';
import {DataSource} from 'typeorm';
import { query } from 'express';
import { ReservationsEntity } from '../reservations/reserv.entity';
import { ReservService } from '../reservations/reserv.service';
import { log } from 'console';
@Injectable({ scope: Scope.REQUEST })
export class RestarauntService {

    constructor(
            private readonly restRepo:RestarauntRepository,
            private readonly reservService:ReservService            
    ){}

    // //simple version
    // async create(data:IRestaraunt){
    //     // const newEntity = await new RestarauntEntity(data);
    //     // return await this.restRepo.create(newEntity);

    //     console.log("!12121212!!")
    //     const queryRunner = this.dataSource.createQueryRunner();
    //     await queryRunner.connect();
    //     await queryRunner.startTransaction();

    //     let res = await queryRunner.manager.save(RestarauntEntity,data);
    //     console.log(res);
    //     await queryRunner.manager.save(ReservationsEntity,{
    //         date:new Date(),
    //         count:2,
    //         restarauntId:res.id,
    //         authorId:1
    //     });


    //     try {
    //         await queryRunner.commitTransaction();
    //     } catch (error) {
    //         await queryRunner.rollbackTransaction()
    //     }finally{
    //         queryRunner.release();
    //     }


    // }

     //simple version
     async create(data:IRestaraunt){
        const newEntity = new RestarauntEntity(data);
        let res = await this.restRepo.create(newEntity);
        console.log('1111111111',res);
        
        await this.reservService.create({
            date:new Date(),
            count:2,
            restarauntId:newEntity.id,
            authorId:1
        })
        console.log("1111",res)
        return res;
        // await this.reservService.create({
        //     date:new Date(),
        //     count:2,
        //     restarauntId:res.id,
        //     authorId:50
        // })
        // return res;

    }

    async findAll(){
        return await this.restRepo.findAll();
    }

    async delete(id:number){
        return await this.restRepo.delete(id);
    }


}
