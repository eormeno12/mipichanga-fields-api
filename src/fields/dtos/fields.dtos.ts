import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';
import { FieldLocation } from '../entities/fields.entity';

export class FieldLocationDto implements FieldLocation {
  @ApiProperty({ description: 'The prefix of the location' })
  @IsNotEmpty()
  @IsString()
  readonly prefix: string;

  @ApiProperty({ description: 'The city of the location' })
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'The country of the location' })
  @IsNotEmpty()
  @IsString()
  readonly country: string;
}

export class CreateFieldDto {
  @ApiProperty({ description: 'The name of the field' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'The image URL of the field' })
  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string;

  @ApiProperty({ description: 'The location of the field' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FieldLocationDto)
  readonly location: FieldLocationDto;
}

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}
