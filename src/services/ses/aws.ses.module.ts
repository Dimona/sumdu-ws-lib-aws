import { DynamicModule, Module } from '@nestjs/common';
import { AwsModule } from '../../modules/aws.module';
import { AwsSesAsyncModuleOptions, AwsSesModuleOptions } from './types/aws.ses.types';
import { AWS_SES_CONFIG_OPTIONS } from './constants/aws.ses.constants';
import { AwsSesService } from './services/aws.ses.service';

@Module({
  imports: [AwsModule],
})
export class AwsSqsModule {
  public static register(options: AwsSesModuleOptions): DynamicModule {
    return {
      module: AwsSqsModule,
      providers: [
        {
          provide: AWS_SES_CONFIG_OPTIONS,
          useValue: options,
        },
        AwsSesService,
      ],
      exports: [AwsSesService],
    };
  }

  public static registerAsync(options: AwsSesAsyncModuleOptions): DynamicModule {
    return {
      module: AwsSqsModule,
      imports: options.imports ?? [],
      providers: [
        {
          provide: AWS_SES_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        AwsSesService,
      ],
      exports: [AwsSesService],
    };
  }
}
