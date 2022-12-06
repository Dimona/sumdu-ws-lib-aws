import { Injectable } from '@nestjs/common';
import {
  CreateTemplateCommand,
  CreateTemplateCommandInput,
  CreateTemplateCommandOutput,
  DeleteTemplateCommand,
  DeleteTemplateCommandInput,
  DeleteTemplateCommandOutput,
  GetTemplateCommand,
  GetTemplateCommandOutput,
  SESClient,
  UpdateTemplateCommand,
  UpdateTemplateCommandInput,
  UpdateTemplateCommandOutput,
} from '@aws-sdk/client-ses';
import { AwsSesService } from './aws.ses.service';

@Injectable()
export class AwsSesTemplateService {
  private readonly client: SESClient;

  constructor(private readonly awsSesService: AwsSesService) {
    this.client = this.awsSesService.getClient();
  }

  get(name: string, options?: any): Promise<GetTemplateCommandOutput> {
    return this.client.send(new GetTemplateCommand({ TemplateName: name }), options);
  }

  create(input: CreateTemplateCommandInput, options?: any): Promise<CreateTemplateCommandOutput> {
    return this.client.send(new CreateTemplateCommand(input), options);
  }

  update(input: UpdateTemplateCommandInput, options?: any): Promise<UpdateTemplateCommandOutput> {
    return this.client.send(new UpdateTemplateCommand(input), options);
  }

  delete(input: DeleteTemplateCommandInput, options?: any): Promise<DeleteTemplateCommandOutput> {
    return this.client.send((new DeleteTemplateCommand(input), options));
  }
}
