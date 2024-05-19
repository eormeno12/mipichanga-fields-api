import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MongoIdPipe } from 'src/pipes/mongoId/mongoId.pipe';
import { CreateFieldDto, UpdateFieldDto } from '../dtos/fields.dtos';
import { FieldsService } from '../services/fields.service';

@ApiTags('fields')
@Controller('fields')
export class FieldsController {
  constructor(private fieldsService: FieldsService) {}

  @Get('/')
  @ApiOperation({ summary: 'Obtener todas las canchas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de canchas obtenida exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  getAllFields() {
    return this.fieldsService.findAll();
  }

  @Get('/:fieldId')
  @ApiOperation({ summary: 'Obtener cancha por ID' })
  @ApiParam({ name: 'fieldId', description: 'ID de la cancha' })
  @ApiResponse({ status: 200, description: 'Cancha obtenida exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  getFieldById(@Param('fieldId', MongoIdPipe) fieldId: string) {
    return this.fieldsService.findOne(fieldId);
  }

  @Post('/')
  @ApiOperation({ summary: 'Crear cancha' })
  @ApiBody({ type: CreateFieldDto })
  @ApiResponse({ status: 201, description: 'Cancha creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  createField(@Body() payload: CreateFieldDto) {
    return this.fieldsService.create(payload);
  }

  @Put('/:fieldId')
  @ApiOperation({ summary: 'Actualizar cancha' })
  @ApiParam({ name: 'fieldId', description: 'ID de la cancha' })
  @ApiBody({ type: UpdateFieldDto })
  @ApiResponse({ status: 200, description: 'Cancha actualizada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  updateField(
    @Param('fieldId', MongoIdPipe) fieldId: string,
    @Body() payload: UpdateFieldDto,
  ) {
    return this.fieldsService.update(fieldId, payload);
  }

  @Delete('/:fieldId')
  @ApiOperation({ summary: 'Eliminar cancha' })
  @ApiParam({ name: 'fieldId', description: 'ID de la cancha' })
  @ApiResponse({ status: 200, description: 'Cancha eliminada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  deleteField(@Param('fieldId', MongoIdPipe) fieldId: string) {
    return this.fieldsService.delete(fieldId);
  }
}
