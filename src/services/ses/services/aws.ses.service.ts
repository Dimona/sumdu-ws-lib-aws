import { Inject, Injectable } from '@nestjs/common';
import {
  CloneReceiptRuleSetCommand,
  CloneReceiptRuleSetCommandOutput,
  SendEmailCommand,
  SendEmailCommandOutput,
  SESClient,
} from '@aws-sdk/client-ses';
import { AWS_SES_CONFIG_OPTIONS } from '../constants/aws.ses.constants';
import { AwsSesModuleOptions } from '../types/aws.ses.types';

@Injectable()
export class AwsSesService {
  private readonly client: SESClient;

  constructor(@Inject(AWS_SES_CONFIG_OPTIONS) private readonly options: AwsSesModuleOptions) {
    this.client = new SESClient(options.client);
  }

  getClient(): SESClient {
    return this.client;
  }

  sendEmail(command: SendEmailCommand, options?: any): Promise<SendEmailCommandOutput> {
    return this.client.send(command, options);
  }
}
