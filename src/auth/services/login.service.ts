import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateLoginUsuarioDto } from '../dto/login.dto';
import { UsuarioLoginSchema } from 'src/schema/login.schema';
import { Model } from 'mongoose';

@Injectable()
export class LoginService {
  constructor(
    @InjectModel(UsuarioLoginSchema.name)
    private loginUsuarioModel: Model<UsuarioLoginSchema>,
  ) {}

  async createLoginUsuario(loginUsuario: CreateLoginUsuarioDto) {
    const newUsuario = new this.loginUsuarioModel(loginUsuario);
    await newUsuario.save();
    console.log('Usuario logueado correctamente.', newUsuario);
    return newUsuario;
  }
}
