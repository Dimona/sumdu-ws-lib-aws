import { default as Aws } from 'aws-sdk';
import { Logger } from '@nestjs/common';
import { ConfigurationOptions } from 'aws-sdk/lib/config-base';
import { ConfigurationServicePlaceholders } from 'aws-sdk/lib/config_service_placeholders';
import { APIVersions } from 'aws-sdk/lib/config';

export class AwsUtils {
  static patchObject<T extends Record<string, any>>(
    object: Partial<T>,
    values: { [key in keyof T]: any },
    options?: Partial<{ ignoreUndefined: boolean; ignoreNull: boolean }>,
  ): void {
    const { ignoreUndefined = false, ignoreNull = false } = options || {};
    if (typeof object !== 'object' || typeof values !== 'object') {
      return;
    }
    Object.keys(values).forEach(key => {
      if (ignoreUndefined && values[key] === undefined) {
        return;
      }
      if (ignoreNull && values[key] === null) {
        return;
      }
      object[key as keyof T] = values[key];
    });
  }

  static configure(
    params: ConfigurationOptions & ConfigurationServicePlaceholders & APIVersions & { [key: string]: any },
  ): void {
    try {
      Aws.config.update(params);
    } catch (e) {
      Logger.error(e.message, e.stack, 'AWS Serverless');
    }
    return;
  }

  static setRegion(region?: string): string | undefined {
    try {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      let _region = region;
      if (!region) {
        _region = process.env.AWS_REGION;
      }

      if (_region) {
        Aws.config.update({ region: _region });
      }

      return _region;
    } catch (e) {
      Logger.error(e.message, e.stack, 'AWS Serverless');
    }
    // @ts-ignore
    return;
  }
}
