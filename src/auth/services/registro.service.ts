import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioRegistroSchema } from 'src/schema/registro.schema';
import { CreateRegistroUsuarioDto } from '../dto/registro.dto/registro.dto';
import { UpdateRegistroUsuarioDto } from '../dto/registro.dto/registro.dto';

@Injectable()
export class RegistroService {
  constructor(
    @InjectModel(UsuarioRegistroSchema.name)
    private registroUsuarioModel: Model<UsuarioRegistroSchema>,
  ) {}

  async createRegistroUsuario(registroUsuario: CreateRegistroUsuarioDto) {
    const newUsuario = new this.registroUsuarioModel(registroUsuario);
    await newUsuario.save();
    console.log('Usuario registrado correctamente.', newUsuario);
    return newUsuario;
  }

  getAllRegistroUsuario() {
    return this.registroUsuarioModel.find();
  }

  async deleteUsuario(id: string) {
    const usuario = await this.registroUsuarioModel.findByIdAndDelete(id);
    console.log('Usuario eliminado correctamente.', usuario);
    return usuario;
  }

  async updateUsuario(id: string, usuario: UpdateRegistroUsuarioDto) {
    return await this.registroUsuarioModel.findOneAndUpdate(
      { _id: id },
      usuario,
      {
        new: true,
      },
    );
  }
}
