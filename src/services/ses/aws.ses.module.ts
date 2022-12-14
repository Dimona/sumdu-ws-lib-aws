import { DynamicModule, Module } from '@nestjs/common';
import { AwsModule } from '../../modules/aws.module';
import { AwsSesAsyncModuleOptions, AwsSesModuleOptions } from './types/aws.ses.types';
import { AWS_SES_CONFIG_OPTIONS } from './constants/aws.ses.constants';
import { AwsSesService } from './services/aws.ses.service';
import { AwsSesEmailService } from './services/aws.ses.email.service';
import { AwsSesTemplateService } from './services/aws.ses.template.service';

@Module({
  imports: [AwsModule],
})
export class AwsSesModule {
  public static register(options: AwsSesModuleOptions): DynamicModule {
    return {
      module: AwsSesModule,
      providers: [
        {
          provide: AWS_SES_CONFIG_OPTIONS,
          useValue: options,
        },
        AwsSesService,
        AwsSesEmailService,
        AwsSesTemplateService,
      ],
      exports: [AwsSesService, AwsSesEmailService, AwsSesTemplateService],
    };
  }

  public static registerAsync(options: AwsSesAsyncModuleOptions): DynamicModule {
    return {
      module: AwsSesModule,
      imports: options.imports ?? [],
      providers: [
        {
          provide: AWS_SES_CONFIG_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        AwsSesService,
        AwsSesEmailService,
        AwsSesTemplateService,
      ],
      exports: [AwsSesService, AwsSesEmailService, AwsSesTemplateService],
    };
  }
}
