import { PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { FieldLocation } from '../entities/fields.entity';

export class FieldLocationDto implements FieldLocation {
  @IsNotEmpty()
  @IsString()
  prefix: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  country: string;
}

export class CreateFieldDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsUrl()
  imageUrl: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FieldLocationDto)
  location: FieldLocationDto;
}

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}
