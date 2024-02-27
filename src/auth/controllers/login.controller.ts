import * as bcrypt from 'bcrypt';
import { CreateLoginUsuarioDto } from '../dto/login.dto';
import { LoginService } from '../services/login.service';
import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Post,
} from '@nestjs/common';

@Controller('login')
export class LoginController {
  constructor(private loginUsuarioService: LoginService) {}
  @Post()
  async postRegistroUsuario(@Body() body: CreateLoginUsuarioDto) {
    try {
      if (!body.contrasena) {
        throw new BadRequestException('La contraseña es obligatoria');
      }

      const saltOrRounds = 10;
      const hashedPassword = await bcrypt.hash(body.contrasena, saltOrRounds);

      const usuarioData = {
        ...body,
        contrasena: hashedPassword,
      };

      const result =
        await this.loginUsuarioService.createLoginUsuario(usuarioData);

      return result;
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Usuario ya existe');
      }
      console.error('Error durante el login:', e);
      throw e;
    }
  }
}
