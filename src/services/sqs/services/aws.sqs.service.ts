import { Inject, Injectable } from '@nestjs/common';
import { SendMessageCommand, SendMessageCommandInput, SendMessageCommandOutput, SQSClient } from '@aws-sdk/client-sqs';
import { AWS_SQS_CONFIG_OPTIONS } from '../constants/aws.sqs.constants';
import { AwsSqsModuleOptions } from '../types/aws.sqs.types';

@Injectable()
export class AwsSqsService {
  private readonly client: SQSClient;

  constructor(@Inject(AWS_SQS_CONFIG_OPTIONS) private readonly options: AwsSqsModuleOptions) {
    this.client = new SQSClient(options.client);
  }

  getClient(): SQSClient {
    return this.client;
  }

  sendMessage(input: SendMessageCommandInput, options?: any): Promise<SendMessageCommandOutput> {
    return this.client.send(new SendMessageCommand(input), options);
  }
}
