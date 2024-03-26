import { Request } from 'express';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ENTITY_MANAGER_KEY } from '../interceptors/transaction.interceptor';

export class BaseRepository {
  constructor(private dataSource: DataSource, private request: Request) {}


  protected async saveData(entityCls,data){
    const entityManager: EntityManager =
      this.request[ENTITY_MANAGER_KEY];

      return await entityManager.save(entityCls,data);
  }
}