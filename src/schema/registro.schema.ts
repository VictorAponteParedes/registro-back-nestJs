import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class UsuarioRegistroSchema {
  @Prop({
    required: true,
    trim: true,
  })
  nombre: string;

  @Prop({
    trim: true,
  })
  apellido: string;

  @Prop({
    unique: true,
    trim: true,
  })
  correo: string;

  @Prop({
    trim: true,
  })
  contrasena: string;

  @Prop({
    type: String,
    trim: true,
  })
  imagen: string;
}

export const RegistroUsuarioSchema = SchemaFactory.createForClass(
  UsuarioRegistroSchema,
);
