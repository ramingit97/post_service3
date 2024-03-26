import { InjectRepository } from "@nestjs/typeorm";
import { Repository,DataSource } from "typeorm";
import { Inject, Injectable } from "@nestjs/common";
import { IReservations } from "../reserv.interface";
import { ReservationsEntity } from "../reserv.entity";
import { BaseRepository } from "@src/common/base.repository";
import { Request } from "express";
import { REQUEST } from "@nestjs/core";

@Injectable()
export class ReservRepository extends BaseRepository{
    constructor(
        @InjectRepository(ReservationsEntity) private reservRepo:Repository<ReservationsEntity>,
        dataSource:DataSource,
        @Inject(REQUEST) req:Request
    ){
        super(dataSource,req);
    }

    async create(reserv:IReservations){
        return await this.saveData(ReservationsEntity,reserv)
    }

    async findAll(query:any){
        return await this.reservRepo.find({
            where:{
                ...query
            },
            relations:{
                author:true,
                restaraunt:true
            }
        });
    }

    
}