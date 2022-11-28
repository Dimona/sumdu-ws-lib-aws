import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { SQSClientConfig } from '@aws-sdk/client-sqs';

export type AwsSqsModuleOptions = {
  client?: SQSClientConfig;
  queues?: Record<string, string>;
};

export type AwsSqsAsyncModuleOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<AwsSqsModuleOptions>, 'useFactory' | 'inject'>;
