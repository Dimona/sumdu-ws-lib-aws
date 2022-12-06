import { FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { SESClientConfig } from '@aws-sdk/client-ses';

export type AwsSesModuleOptions = {
  client?: SESClientConfig;
  email: {
    source: string;
  };
};

export type AwsSesAsyncModuleOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<AwsSesModuleOptions>, 'useFactory' | 'inject'>;
