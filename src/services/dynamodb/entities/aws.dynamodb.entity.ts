import { TDynamodbEntity } from '../types/aws.dynamodb.types';
import { AwsUtils } from '../../../utils/aws.utils';

export abstract class AwsDynamodbEntity<TEntity extends TDynamodbEntity> {
  constructor(params?: Partial<TEntity>) {
    AwsUtils.patchObject<Partial<TEntity>>(this, params, { ignoreUndefined: true });
  }
}
