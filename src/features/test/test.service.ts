import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class TestService {


    constructor(
        @Inject('CONFIG_OPTIONS') private config
    ){}

    async test(){
        return this.config;
    }


}
