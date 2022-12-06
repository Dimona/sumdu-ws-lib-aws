import { Inject, Injectable } from '@nestjs/common';
import {
  CreateTemplateCommand,
  CreateTemplateCommandInput,
  CreateTemplateCommandOutput,
  DeleteTemplateCommand,
  DeleteTemplateCommandInput,
  DeleteTemplateCommandOutput,
  GetTemplateCommand,
  GetTemplateCommandOutput,
  SendEmailCommand,
  SendEmailCommandInput,
  SendEmailCommandOutput,
  SESClient,
  UpdateTemplateCommand,
  UpdateTemplateCommandInput,
  UpdateTemplateCommandOutput,
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

  sendEmail(input: SendEmailCommandInput, options?: any): Promise<SendEmailCommandOutput> {
    return this.client.send(new SendEmailCommand(input), options);
  }

  getTemplate(name: string, options?: any): Promise<GetTemplateCommandOutput> {
    return this.client.send(new GetTemplateCommand({ TemplateName: name }), options);
  }

  createTemplate(input: CreateTemplateCommandInput, options?: any): Promise<CreateTemplateCommandOutput> {
    return this.client.send(new CreateTemplateCommand(input), options);
  }

  updateTemplate(input: UpdateTemplateCommandInput, options?: any): Promise<UpdateTemplateCommandOutput> {
    return this.client.send(new UpdateTemplateCommand(input), options);
  }

  deleteTemplate(input: DeleteTemplateCommandInput, options?: any): Promise<DeleteTemplateCommandOutput> {
    return this.client.send((new DeleteTemplateCommand(input), options));
  }
}
