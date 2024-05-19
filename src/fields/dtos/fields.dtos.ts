import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, IsUrl, ValidateNested } from 'class-validator';

export class FieldLocationDto {
  @ApiProperty({ description: 'El prefijo de la ubicación' })
  @IsNotEmpty()
  @IsString()
  readonly prefix: string;

  @ApiProperty({ description: 'La ciudad de la ubicación' })
  @IsNotEmpty()
  @IsString()
  readonly city: string;

  @ApiProperty({ description: 'El país de la ubicación' })
  @IsNotEmpty()
  @IsString()
  readonly country: string;
}

export class CreateFieldDto {
  @ApiProperty({ description: 'Nombre de la cancha' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ description: 'URL de la imagen de la cancha' })
  @IsNotEmpty()
  @IsUrl()
  readonly imageUrl: string;

  @ApiProperty({ description: 'Ubicación de la cancha' })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => FieldLocationDto)
  readonly location: FieldLocationDto;
}

export class UpdateFieldDto extends PartialType(CreateFieldDto) {}
