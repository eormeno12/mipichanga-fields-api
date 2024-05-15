import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class FieldLocation {
  prefix: string;
  city: string;
  country: string;
}

@Schema({ _id: false })
export class FieldLocationSchema extends Document implements FieldLocation {
  @Prop({ type: String, required: true })
  prefix: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  country: string;
}

@Schema({ timestamps: true })
export class Field extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  imageUrl: string;

  @Prop({ type: FieldLocationSchema, required: true })
  location: FieldLocation;
}

export const FieldSchema = SchemaFactory.createForClass(Field);
