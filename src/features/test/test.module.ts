import { DynamicModule, Module } from '@nestjs/common';
import { TestService } from './test.service';


interface ITestProps{
    folder:string;
    path:string;
}

@Module({
 
})
export class TestModule  {
  static register2(options:ITestProps):DynamicModule{
    return {
      global:true,
      module:TestModule,
      providers:[
        {
          provide:"CONFIG_OPTIONS",
          useValue:options
        },
        TestService
       
      ],
      exports:[TestService]
    }
  }

}
