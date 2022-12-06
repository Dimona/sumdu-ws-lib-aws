import { Injectable } from '@nestjs/common';
import { SendEmailCommand, SendEmailCommandInput, SendEmailCommandOutput, SESClient } from '@aws-sdk/client-ses';
import { AwsSesService } from './aws.ses.service';

@Injectable()
export class AwsSesEmailService {
  private readonly client: SESClient;

  constructor(private readonly awsSesService: AwsSesService) {
    this.client = this.awsSesService.getClient();
  }

  send(input: SendEmailCommandInput, options?: any): Promise<SendEmailCommandOutput> {
    return this.client.send(new SendEmailCommand(input), options);
  }
}
