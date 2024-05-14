import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FieldsController } from './controllers/fields.controller';
import { Field, FieldSchema } from './entities/fields.entity';
import { FieldsService } from './services/fields.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Field.name,
        schema: FieldSchema,
      },
    ]),
  ],
  controllers: [FieldsController],
  providers: [FieldsService],
})
export class UsersModule {}
