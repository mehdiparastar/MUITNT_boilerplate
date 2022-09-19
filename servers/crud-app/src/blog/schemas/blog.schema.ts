import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Blog {
  @Prop()
  title: String;
  @Prop()
  description: String;
  @Prop()
  body: String;
  @Prop()
  author: String;
  @Prop()
  date_posted: String;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
