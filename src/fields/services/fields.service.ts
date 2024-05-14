import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Field } from '../entities/fields.entity';
import { CreateFieldDto, UpdateFieldDto } from '../dtos/fields.dtos';

@Injectable()
export class FieldsService {
  constructor(@InjectModel(Field.name) private fieldModel: Model<Field>) {}

  private validateIfDocumentExists(document: Field | null, documentId: string) {
    if (!document) {
      throw new NotFoundException(
        "The Field with the id: '" + documentId + "' does not exist.",
      );
    }
  }

  findAll() {
    return this.fieldModel.find(
      {},
      {
        createdAt: 0,
        updatedAt: 0,
        __v: 0,
      },
    );
  }

  async findOne(id: string) {
    const field = await this.fieldModel.findOne(
      {
        _id: id,
      },
      {
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    );

    this.validateIfDocumentExists(field, id);

    return field;
  }

  create(payload: CreateFieldDto) {
    const field: Field = new this.fieldModel(payload);

    return field.save();
  }

  async update(id: string, payload: UpdateFieldDto) {
    const field = await this.findOne(id);

    field.set(payload);

    return field.save();
  }

  async delete(id: string) {
    const res = await this.fieldModel.deleteOne({ _id: id });

    return res;
  }
}
