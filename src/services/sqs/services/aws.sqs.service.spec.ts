import { AwsSqsModuleOptions } from '../types/aws.sqs.types';
import { SendMessageCommand, SendMessageCommandInput, SendMessageCommandOutput, SQSClient } from '@aws-sdk/client-sqs';
import { AwsSqsService } from './aws.sqs.service';
import { default as faker } from 'faker';

const client: SQSClient = {
  send: jest.fn(),
} as any;

const command: SendMessageCommand = {} as any;
jest.mock('@aws-sdk/client-sqs', () => ({
  // @ts-ignore
  ...jest.requireActual('@aws-sdk/client-sqs'),
  SQSClient: jest.fn().mockImplementation(() => client),
  SendMessageCommand: jest.fn().mockImplementation(() => command),
}));

const options: AwsSqsModuleOptions = {
  client: {
    apiVersion: '123',
  },
  queues: {
    test: 'test',
  },
};

let awsSqsService: AwsSqsService;

beforeEach(() => {
  awsSqsService = new AwsSqsService(options);
});

test('constructor', () => {
  expect(SQSClient).toHaveBeenCalledWith(options.client);
});

test('getClient happy path', () => {
  expect(awsSqsService.getClient()).toEqual(client);
});

test('send happy path', async () => {
  const input: SendMessageCommandInput = { MessageBody: 'test', QueueUrl: faker.internet.url() };
  const output = <SendMessageCommandOutput>{
    MessageId: faker.random.alpha({ count: 5 }),
  };
  (client.send as any).mockImplementation(() => Promise.resolve(output));

  const result = await awsSqsService.sendMessage(input);

  expect(result).toEqual(output);
  expect(SendMessageCommand).toHaveBeenCalledWith(input);
  expect(client.send).toHaveBeenCalledWith(command, undefined);
});
