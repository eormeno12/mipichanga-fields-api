import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/pipes/mongoId/mongoId.pipe';
import { CreateFieldDto, UpdateFieldDto } from '../dtos/fields.dtos';
import { FieldsService } from '../services/fields.service';

@ApiTags('fields')
@Controller('fields')
export class FieldsController {
  constructor(private fieldsService: FieldsService) {}

  // get all fields
  @Get('/')
  @ApiOperation({ summary: 'Get all fields' })
  getAllFields() {
    return this.fieldsService.findAll();
  }

  // get field by id
  @Get('/:fieldId')
  @ApiOperation({ summary: 'Get field by id' })
  getFieldById(@Param('fieldId', MongoIdPipe) fieldId: string) {
    return this.fieldsService.findOne(fieldId);
  }

  // create field
  @Post('/')
  @ApiOperation({ summary: 'Create field' })
  createField(@Body() payload: CreateFieldDto) {
    return this.fieldsService.create(payload);
  }

  // update field
  @Put('/:fieldId')
  @ApiOperation({ summary: 'Update field' })
  updateField(
    @Param('fieldId', MongoIdPipe) fieldId: string,
    @Body() payload: UpdateFieldDto,
  ) {
    return this.fieldsService.update(fieldId, payload);
  }

  // delete field
  @Delete('/:fieldId')
  @ApiOperation({ summary: 'Delete field' })
  deleteField(@Param('fieldId', MongoIdPipe) fieldId: string) {
    return this.fieldsService.delete(fieldId);
  }
}
