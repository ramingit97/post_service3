import { InjectRepository } from "@nestjs/typeorm";
import { Repository,DataSource} from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { RestarauntEntity } from "../restaraunt.entity";
import { BaseRepository } from "@src/common/base.repository";
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RestarauntRepository extends BaseRepository {
    constructor(
        @InjectRepository(RestarauntEntity) private restRepo:Repository<RestarauntEntity>,
        dataSource:DataSource,
        @Inject(REQUEST) req:Request
    ){
        super(dataSource,req);
    }

    async create(user:RestarauntEntity){
        return await this.saveData(RestarauntEntity,user);
    }

    async findAll(){
        return await this.restRepo.find({
            relations:{
                author:true
            }
        });
    }


    async findById(id:number){
        // return await this.restRepo.findOne({where:{id}});
    }

    async delete(id:number){
        // return await this.restRepo.delete({id})
    }
}