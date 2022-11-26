import { registerAs } from '@nestjs/config';
import { AWS_CONFIG } from '../constants/aws.constants';
import { AwsConfig } from '../types/aws.types';

export const awsConfig = registerAs(
  AWS_CONFIG,
  () =>
    <AwsConfig>{
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_DEFAULT_REGION,
    },
);
