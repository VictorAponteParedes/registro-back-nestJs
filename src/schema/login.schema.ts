import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class UsuarioLoginSchema {
  @Prop({
    unique: true,
    trim: true,
  })
  correo: string;

  @Prop({
    trim: true,
  })
  contrasena: string;
}

export const LoginUsuarioLoginSchema =
  SchemaFactory.createForClass(UsuarioLoginSchema);
