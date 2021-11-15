import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ConsentType } from 'shared/consent-type';

class ConsentsDto {
  @IsBoolean()
  enabled: boolean;

  @IsEnum(ConsentType)
  type: ConsentType;
}

export class CreateEventDto {
  @IsUUID()
  userId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsentsDto)
  consents: ConsentsDto[];
}
