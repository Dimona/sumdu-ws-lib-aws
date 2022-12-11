const client: DynamoDBClient = {} as any;
jest.mock('@aws-sdk/client-dynamodb', () => ({
  // @ts-ignore
  ...jest.requireActual('@aws-sdk/client-dynamodb'),
  DynamoDBClient: jest.fn().mockImplementation(() => client),
}));

const documentClient: DocumentClientV3 = {} as any;
jest.mock('@typedorm/document-client', () => ({
  // @ts-ignore
  ...jest.requireActual('@typedorm/document-client'),
  DocumentClientV3: jest.fn().mockImplementation(() => documentClient),
}));

const connection: Connection = {} as any;
const entityManager: EntityManager = {} as any;
const scanManager: ScanManager = {} as any;
jest.mock('@typedorm/core', () => ({
  // @ts-ignore
  ...jest.requireActual('@typedorm/core'),
  createConnection: jest.fn().mockImplementation(() => connection),
  getEntityManager: jest.fn().mockImplementation(() => entityManager),
  getScanManager: jest.fn().mockImplementation(() => scanManager),
}));

import {
  Connection,
  createConnection,
  EntityManager,
  getEntityManager,
  getScanManager,
  ScanManager,
} from '@typedorm/core';
import { AwsDynamodbModuleOptions } from '../types/aws.dynamodb.types';
import { Table } from '@typedorm/common';
import { AwsDynamodbService } from './aws.dynamodb.service';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DocumentClientV3 } from '@typedorm/document-client';

const options: AwsDynamodbModuleOptions = {
  client: {
    apiVersion: '123',
  },
  connections: {
    test: {
      table: new Table({
        name: 'test',
        partitionKey: 'id',
      }),
      entities: [],
    },
  },
};

let awsDynamodbService: AwsDynamodbService;

beforeEach(() => {
  awsDynamodbService = new AwsDynamodbService(options);
});

test('constructor', () => {
  expect(DynamoDBClient).toHaveBeenCalledWith(options.client);
  expect(DocumentClientV3).toHaveBeenCalledWith(client);
  expect(createConnection).toHaveBeenNthCalledWith(1, { name: 'test', documentClient, ...options.connections.test });
});

test('getOptions happy path', () => {
  expect(awsDynamodbService.getOptions()).toEqual(options);
});

test('getClient happy path', () => {
  expect(awsDynamodbService.getClient()).toEqual(client);
});

test('getDocumentClient happy path', () => {
  expect(awsDynamodbService.getDocumentClient()).toEqual(documentClient);
});

test('getEntityManager happy path', () => {
  const result = awsDynamodbService.getEntityManager('test');

  expect(result).toEqual(entityManager);
  expect(getEntityManager).toHaveBeenCalledWith('test');
});

test('getScanManager happy path', () => {
  const result = awsDynamodbService.getScanManager('test');

  expect(result).toEqual(entityManager);
  expect(getScanManager).toHaveBeenCalledWith('test');
});

test('getConnection happy path', () => {
  const result = awsDynamodbService.getScanManager('test');

  expect(result).toEqual(entityManager);
  expect(getScanManager).toHaveBeenCalledWith('test');
});
