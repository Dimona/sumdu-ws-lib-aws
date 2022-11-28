import { DynamicModule, Module } from '@nestjs/common';
import { AwsModule } from '../../modules/aws.module';
import { AwsSqsAsyncModuleOptions, AwsSqsModuleOptions } from './types/aws.sqs.types';
import { AWS_SQS_CONFIG_OPTIONS } from './constants/aws.sqs.constants';
import { AwsSqsService } from './services/aws.sqs.service';

@Module({
  imports: [AwsModule],
})
export class AwsSqsModule {
  public static register(options: AwsSqsModuleOptions): DynamicModule {
    return {
      module: AwsSqsModule,
      providers: [
        {
          provide: AWS_SQS_CONFIG_OPTIONS,
          useValue: options,
        },
        AwsSqsService,
      ],
      exports: [AwsSqsService],
    };
  }

  public static registerAsync(options: AwsSqsAsyncModuleOptions): DynamicModule {
    return {
      module: AwsSqsModule,
      imports: options.imports ?? [],
      providers: [
        {
          provide: AWS_SQS_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        AwsSqsService,
      ],
      exports: [AwsSqsService],
    };
  }
}
