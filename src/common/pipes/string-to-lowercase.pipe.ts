import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

export class StringToLowercasePipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    return typeof value === 'string' ? value.toLowerCase() : value;
  }
}
