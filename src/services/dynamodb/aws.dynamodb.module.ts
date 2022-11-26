import { DynamicModule, Module } from '@nestjs/common';
import { AwsModule } from '../../modules/aws.module';
import { AwsDynamodbAsyncModuleOptions, AwsDynamodbModuleOptions } from './types/aws.dynamodb.types';
import { AWS_DYNAMODB_CONFIG_OPTIONS } from './constants/aws.dynamodb.constants';
import { AwsDynamodbService } from './services/aws.dynamodb.service';

@Module({
  imports: [AwsModule],
})
export class AwsDynamodbModule {
  public static register(options: AwsDynamodbModuleOptions): DynamicModule {
    return {
      module: AwsDynamodbModule,
      providers: [
        {
          provide: AWS_DYNAMODB_CONFIG_OPTIONS,
          useValue: options,
        },
        AwsDynamodbService,
      ],
      exports: [AwsDynamodbService],
    };
  }

  public static registerAsync(options: AwsDynamodbAsyncModuleOptions): DynamicModule {
    return {
      module: AwsDynamodbModule,
      imports: options.imports ?? [],
      providers: [
        {
          provide: AWS_DYNAMODB_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        AwsDynamodbService,
      ],
      exports: [AwsDynamodbService],
    };
  }
}
